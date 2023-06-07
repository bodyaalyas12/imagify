import Link from "next/link";
import Head from "next/head";
import React from "react";
import { Grid, Stack, Button } from "@/components/material/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Head>
        <title>Imagify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
