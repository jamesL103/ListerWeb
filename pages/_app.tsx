import type {AppProps} from "next/app"
import Layout from "../components/default_layout"

export default function App({Component, pageProps}: AppProps) {
    return (
            <Component {...pageProps} />
    )
}