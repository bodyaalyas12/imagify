import '../styles/globals.css'
import GlobalStyles from "../components/styled/globalStyles";

function MyApp({Component, pageProps}) {
    return <>
        <GlobalStyles/>
        <Component {...pageProps} />
    </>
}

export default MyApp
