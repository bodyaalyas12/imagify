import { getHistoryData } from "@/app/(withNavigation)/history/getHistoryData";
import { Divider, List, ListItem, ListItemText } from "@/components/material/client";

export const metadata = {
  title: "History",
};

export default async function Page() {
  const data = await getHistoryData();
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {data.length > 0
        ? data.map((item) => (
            <>
              <ListItem>
                <ListItemText primary={item.search} secondary={item.createdAt.toUTCString()} />
              </ListItem>
              <Divider variant="fullWidth" />
            </>
          ))
        : "History is empty"}
    </List>
  );
}
