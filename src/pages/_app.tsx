import React from 'react';
import "@carbon/charts/styles.css";
import "../app/globals.css";
import '../styles/global.scss';
import type { AppProps } from 'next/app'
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
// import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QKLXGB0SHL%22%3E"/>
                <Script>
                    {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QKLXGB0SHL');`}
                </Script> */}
    <Header  enterCode/>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
