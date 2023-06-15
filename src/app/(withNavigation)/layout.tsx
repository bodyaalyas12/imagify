"use client";
import Link from "next/link";
import React from "react";
import { Button, Grid, Stack } from "@/components/material/client";
import { signOut } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container direction={"column"} p={2}>
      <Stack direction={"row"} justifyContent={"center"} spacing={3}>
        <Link href={"/"}>
          <Button>Main page</Button>
        </Link>
        <Link href={"/history"}>
          <Button>History</Button>
        </Link>
        <Button onClick={() => signOut()}>Logout</Button>
      </Stack>
      {children}
    </Grid>
  );
};
export default Layout;
