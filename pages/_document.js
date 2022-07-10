/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon.png"
          ></link>
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
