"use client";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import request from "@/components/helpers/request";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid } from "@mui/material";
import addLikeAction from "@/app/(withNavigation)/addLikeAction";
import { LoadingButton, Masonry } from "@mui/lab";

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
  const onLike = async (id: string, isLiked: boolean) => {
    const res = await addLikeAction({ imageId: id, isLiked });
    console.log(res);
    const newItems = [...items];
    const clickedItem = newItems.find(({ id: imageId }) => id === imageId);
    if (clickedItem) {
      clickedItem.isLiked = !clickedItem.isLiked;
    }
    setItems(newItems);
  };

  return (
    <Grid item container direction={"column"} xs mt={2}>
      <Grid container item spacing={3} p={2} alignItems={"center"} justifyContent={"center"}>
        <Grid item width={350}>
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
          <LoadingButton loading={loading} variant={"contained"} color="primary" onClick={onSearch}>
            Find images
          </LoadingButton>
        </Grid>
      </Grid>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
        {items.map(({ url, id, isLiked }: PhotoItem, index) => {
          return (
            <Grid container direction={"column"} key={index} width={"auto"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={""} src={url} width={"100%"} />
              <Grid container justifyContent={"center"}>
                <FavoriteBorderIcon
                  sx={{ cursor: "pointer" }}
                  color={isLiked ? "secondary" : "primary"}
                  onClick={() => onLike(id, isLiked)}
                />
              </Grid>
            </Grid>
          );
        })}
      </Masonry>
    </Grid>
  );
}
