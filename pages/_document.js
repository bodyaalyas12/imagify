import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import { ServerStyleSheets as MaterialStyleSheets } from '@material-ui/core/styles';


export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const materialSheet = new MaterialStyleSheets()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(
                            materialSheet.collect(<App {...props} />)
                        ),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {materialSheet.getStyleElement()}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}
