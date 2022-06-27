import { Fragment, useEffect } from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {


  return (
    <div>
      <Fragment>
        <Head>
          <title>
            {" "}
            Aero Contractors the Reliable Way to Fly - Book Affordable Flights
          </title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Book all your flights" />
          <meta
            id="MetaDescription"
            name="DESCRIPTION"
            content={`The reliable way to fly, Scheduled commercial flights and helicopter offshore oil and gas sector operation, flying local and regional routes at affordable prices.`}
          />
          <meta
            id="MetaKeywords"
            name="KEYWORDS"
            content={`cheap flights, cheap airline tickets, Abuja tickets, flights, flight deals, cheap airfare, lagos tickets`}
          />
          <meta
            id="MetaCopyright"
            name="COPYRIGHT"
            content="Copyright 2022 Aero Contractors Company of Nigeria Limited. All rights reserved."
          />
          <meta
            id="MetaAuthor"
            name="AUTHOR"
            content="Aerocontractors the reliable way to fly - Book cheap flights flyaero.com"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/public/images/favicon.png"
          />
        </Head>
        <Toaster />
        <Component {...pageProps} />
      </Fragment>
    </div>
  );
};

export default MyApp;
