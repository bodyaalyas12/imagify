import { FlexBlock } from "./styled";
import Link from "next/link";
import Button from "@mui/material/Button";
import Head from "next/head";
import request from "./helpers/request";
import Router from "next/router";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const onLogout = () => {
    request({
      url: `/api/users/logout`,
    }).then(() => {
      Router.push("/login");
    });
  };
  return (
    <FlexBlock column alignCenter justifyCenter>
      <Head>
        <title>Imagify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlexBlock>
        <Link href={"/"}>
          <Button>Main page</Button>
        </Link>
        <Link href={"/history"}>
          <Button>History</Button>
        </Link>
        <Button onClick={onLogout} variant={"contained"}>
          Logout
        </Button>
      </FlexBlock>
      {children}
    </FlexBlock>
  );
};
export default Layout;
