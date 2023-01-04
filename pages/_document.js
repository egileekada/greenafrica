/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              function initFreshChat() {
                      window.fcWidget.init({
                          token: "3a2bd34c-b92e-4310-bc2d-7f4f1db8b881",
                          host: "https://greenafrica-350507227206212.freshchat.com"
                      });
                  }
              
              function initialize(i, t) {
                  var e;
                  i.getElementById(t) ?
                      initFreshChat() : ((e = i.createElement("script")).id = t, e.async = !0,
                          e.src = "https://greenafrica-350507227206212.freshchat.com/js/widget.js", e.onload = initFreshChat, i.head.appendChild(e))
              }
              
              function initiateCall() {
                  initialize(document, "Freshchat-js-sdk")
              }
              window.addEventListener ? window.addEventListener("load", initiateCall, !1) :
                  window.attachEvent("load", initiateCall, !1);
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
