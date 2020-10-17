import {useEffect} from 'react'
import '../styles/globals.css'
import GlobalStyles from "../src/components/styled/globalStyles";
import 'toastr/toastr.scss'
import Head from "next/head";

function MyApp({Component, pageProps}) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return <>
        <GlobalStyles/>
        <Head>
            <title>Imagify</title>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
