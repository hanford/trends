import * as React from "react";
import Document, { Html, Main } from "next/document";
import { Global, css } from "@emotion/core";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <title>Trends</title>
          <meta name="name" content="trends" />
          <meta
            name="description"
            content="Browse github repos that are currently trending"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#3362c6" />

          <Global
            styles={css`
              * {
                box-sizing: border-box !important;
              }
              html {
                font-size: 10px;
              }
              body {
                font-size: 1.6rem;
                margin: 0;
                overflow-x: hidden;
              }
            `}
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
        </head>
        <body>
          <Main />

          <Script src={clientSideJS} />

          {isProduction && (
            <>
              {/* <Script src={serviceWorkerRegistration} /> */}

              <script
                async={true}
                src={
                  "https://www.googletagmanager.com/gtag/js?id=UA-45226320-5"
                }
              />

              <Script src={GA} />
            </>
          )}
        </body>
      </Html>
    );
  }
}

const Script = ({ src }) => {
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: src }} />
  );
};

const clientSideJS = `
  document.addEventListener('DOMContentLoaded', event => {
    const checkbox = document.querySelector('input[name=dark]')
    document.querySelector('select[name=language]').addEventListener('change', submit)
    document.querySelector('select[name=time]').addEventListener('change', submit)
    checkbox.addEventListener('change', submit)

    function submit () {
      checkbox.value = checkbox.checked
      document.tune.submit()
    }
  })
`;

// const serviceWorkerRegistration = `
//   document.addEventListener('DOMContentLoaded', event => {
//     if ('serviceWorker' in navigator) {
//       window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/_next/static/service-worker.js', { scope: "/" }).then(registration => {
//           console.log('SW registered: ', registration)
//         }).catch(registrationError => {
//           console.log('SW registration failed: ', registrationError)
//         })
//       })
//     }
//   })
// `;

const GA = `
  window.dataLayer = window.dataLayer || [];
  function gtag () {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-45226320-5');
`;
