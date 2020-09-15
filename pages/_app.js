import '../styles/globals.css'
import GlobalStyles from "../src/components/styled/globalStyles";
import 'toastr/toastr.scss'

function MyApp({Component, pageProps}) {
	return <>
		<GlobalStyles/>
		<Component {...pageProps} />
	</>
}

export default MyApp
