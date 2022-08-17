import { Fragment, useState, useEffect } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.scss";
import "../styles/loader.scss";
import "nprogress/nprogress.css";

import Preloader from "components/Preloader";

const MyApp = ({ Component, pageProps }) => {
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png"></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.png"
        ></link>
        <link rel="shortcut icon" href="/favicon.png"></link>

        {/* Primary Meta Tags  */}
        <title>
          Green Africa — One flight closer to your dreams and destinations.
        </title>
        <meta
          name="title"
          content="Green Africa — You are one flight closer to your dreams and destinations."
          key="title"
        />
        <meta
          name="description"
          content="We are a new carrier that offers safe, reliable and affordable air travel to a much broader group of customers."
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev-website.gadevenv.com/" />
        <meta
          property="og:title"
          content="Green Africa — One flight closer to your dreams and destinations."
          key="ogTitle"
        />
        <meta
          property="og:description"
          content="We are a new carrier that offers safe, reliable and affordable air travel to a much broader group of customers."
        />
        <meta
          property="og:image"
          content="https://dev-website.gadevenv.com/images/seo_image.jpg"
        />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://dev-website.gadevenv.com/"
        />
        <meta
          property="twitter:title"
          content="Green Africa — One flight closer to your dreams and destinations."
          key="twitterTitle"
        />
        <meta
          property="twitter:description"
          content="We are a new carrier that offers safe, reliable and affordable air travel to a much broader group of customers."
        />
        <meta
          property="twitter:image"
          content="https://dev-website.gadevenv.com/images/seo_image.jpg"
        />
      </Head>
      <Fragment>
        <main className="main">
          <Preloader />
          <Toaster />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </main>
      </Fragment>
    </>
  );
};

export default MyApp;
