import fetch from "isomorphic-unfetch"
import { NextUrqlAppContext, withUrqlClient } from "next-urql"
import NextApp, { AppProps } from "next/app"
import React from "react"
import { useKeyBindings } from "../lib/key"
import { getTheme, setDarkMode, setLightMode } from "../lib/theme"
import "../styles.css"

const App = ({ Component, pageProps }: AppProps) => {
  useKeyBindings({
    KeyT: {
      fn: () => {
        if (getTheme() == "light") {
          setDarkMode()
        } else {
          setLightMode()
        }
      }
    }
  })

  return <Component {...pageProps} />
}

App.getInitialProps = async (ctx: NextUrqlAppContext) => {
  const appProps = await NextApp.getInitialProps(ctx)

  return {
    ...appProps
  }
}

export default withUrqlClient(() => ({
  url: "http://localhost:8080/v1/graphql",
  fetch
}))(
  // @ts-ignore
  App
)
