import Link from "next/link";
import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Imagify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"flex"}>
        <Link href={"/"}>
          <button>Main page</button>
        </Link>
        <Link href={"/history"}>
          <button>History</button>
        </Link>
        <button>Logout</button>
      </div>
      {children}
    </div>
  );
};
export default Layout;
