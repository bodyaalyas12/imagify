import Link from "next/link";
import React from "react";
import { Button, Grid, Stack } from "@/components/material/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Stack>
        <Link href={"/"}>
          <Button>Main page</Button>
        </Link>
        <Link href={"/history"}>
          <Button>History</Button>
        </Link>
        <Button>Logout</Button>
      </Stack>
      {children}
    </Grid>
  );
};
export default Layout;
