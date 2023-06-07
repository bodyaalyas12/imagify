"use client";

import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import request from "@/components/helpers/request";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid } from "@mui/material";

export type PhotoItem = {
  url: string;
  id: string;
  isLiked: boolean;
};

export default function MainPageComponent() {
  const [searchString, setSearchString] = useState("");
  const [items, setItems] = useState<Array<PhotoItem>>([]);
  const [loading, setLoading] = useState(false);
  const onSearch = useCallback(() => {
    if (searchString) {
      setLoading(true);
      request({
        url: `/api/images?search=${searchString}`,
      }).then((newItems) => {
        if (newItems.length) {
          setItems(newItems);
        }
        setLoading(false);
      });
    }
  }, [searchString, setItems, setLoading]);
  const onLike = (id: string, isLiked: boolean) => {
    request({
      url: `/api/likes`,
      method: isLiked ? "DELETE" : "POST",
      body: {
        id,
      },
    }).then(() => {
      const newItems = [...items];
      const clickedItem = newItems.find(({ id: imageId }) => id === imageId);
      if (clickedItem) {
        clickedItem.isLiked = !clickedItem.isLiked;
      }
      setItems(newItems);
    });
  };

  return (
    <>
      <Grid container spacing={3} alignItems={"center"} m={4} width={500}>
        <Grid item xs>
          <TextField
            label="Search"
            onChange={({ target }) => setSearchString(target.value)}
            name={"search"}
            value={searchString}
            fullWidth={true}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button variant={"contained"} color="primary" onClick={onSearch}>
            Find images
          </Button>
        </Grid>
      </Grid>
      <Grid container flexWrap={"wrap"} alignItems={"center"}>
        {loading ? (
          <CircularProgress />
        ) : (
          items.map(({ url, id, isLiked }, index) => {
            return (
              <Grid container direction={"column"} key={index} width={"auto"} m={2}>
                <img width={"auto"} alt={""} src={url} />
                <Grid container justifyContent={"center"}>
                  <FavoriteBorderIcon
                    sx={{ cursor: "pointer" }}
                    color={isLiked ? "secondary" : "primary"}
                    onClick={() => onLike(id, isLiked)}
                  />
                </Grid>
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}
