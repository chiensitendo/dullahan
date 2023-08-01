import React from "react";
import "@carbon/charts/styles.css";
import "../app/globals.css";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReCaptchaProvider } from "next-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header enterCode />
      <ReCaptchaProvider reCaptchaKey="6LfCE3InAAAAANyChv4eJE1e6XgbZZoZHrKka5p5">
        <Component {...pageProps} />
      </ReCaptchaProvider>
    </Provider>
  );
}

export default MyApp;
