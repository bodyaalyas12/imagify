import {FlexBlock} from "./styled";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import request from "./helpers/request";
import getConfig from "next/config";
import Router from "next/router";

const {publicRuntimeConfig} = getConfig();


const Layout = ({children}) => {
    const onLogout = () => {
        request({
            url: `${publicRuntimeConfig.CLIENT_API_URL}/users/logout`,
        }).then(() => {
            Router.push('/login')
        })
    }
    return (
        <FlexBlock column alignCenter justifyCenter>
            <Head>
                <title>Imagify</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <FlexBlock>
                <Link href={'/'}>
                    <Button>Main page</Button>
                </Link>
                <Link href={'/history'}>
                    <Button>History</Button>
                </Link>
                <Button onClick={onLogout} variant={'contained'}>
                    Logout
                </Button>
            </FlexBlock>
            {children}
        </FlexBlock>
    )
}
export default Layout
