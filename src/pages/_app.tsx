import React from 'react';
import "@carbon/charts/styles.css";
import "../app/globals.css";
import '../styles/global.scss';
import type { AppProps } from 'next/app'
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Header  enterCode/>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
