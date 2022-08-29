import { Fragment, useEffect } from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.scss";
import "../styles/loader.scss";

import Preloader from "components/Preloader";

import { store } from "redux/store"
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Provider store={store}>
        <Head>
          <title>Green Africa</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="initial-scale=1.0, minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no"
          />
          <meta name="theme-color" content="#000000" />
          <meta
            httpEquiv="Cache-Control"
            content="no-cache, no-store, must-revalidate"
          />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta name="author" content="" />
          <meta name="description" content="" />
          <meta name="keywords" content="Green Africa" />

          <link rel="canonical" href="https://www.greenafrica.com/en-us/" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="//static.greenafrica.com/assets/imgs/favicons/apple-touch-icon.png?10559"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="//static.greenafrica.com/assets/imgs/favicons/favicon-32x32.png?10559"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="//static.greenafrica.com/assets/imgs/favicons/favicon-16x16.png?10559"
          />
          <link
            rel="mask-icon"
            href="//static.greenafrica.com/assets/imgs/favicons/safari-pinned-tab.svg?10559"
            color="#6f2c91"
          />
          <meta name="msapplication-TileColor" content="#6f2c91" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="format-detection" content="telephone=no" />
          {/* <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/public/images/favicon.png"
          /> */}
        </Head>
        <Fragment>
          <main className="main">
            <Preloader />
            <Toaster />
            <Component {...pageProps} />
          </main>
        </Fragment>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
