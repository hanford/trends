import { extractCritical } from "emotion-server";
import Document, { Html, Head, Main } from "next/document";

interface Props {
  css: any;
  amphtml: boolean;
}

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);

    return {
      ...page,
      ...styles
    };
  }

  render() {
    const { amphtml } = this.props;
    console.log({ amphtml });

    return (
      <Html lang="en">
        <Head>
          {/* <link rel="amphtml" href="/index.amp" /> */}
          {/* <link rel="canonical" href="/" /> */}

          <style
            amp-custom={true}
          >{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style>

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          {!amphtml && (
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width, viewport-fit=cover"
            />
          )}
          <title>Trends</title>
          <meta name="name" content="trends" />
          <meta
            name="description"
            content="Browse github repos that are currently trending"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#3362c6" />

          {/* <style
            amp-custom
            dangerouslySetInnerHTML={{
              __html: `* { box-sizing: border-box !important; } html { font-size: 10px } body { font-size: 1.6rem; margin: 0; }`
            }}
          />

          <style amp-custom dangerouslySetInnerHTML={{ __html: this.props.css }} /> */}

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

          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
          />
          <script
            async
            custom-template="amp-mustache"
            src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
          />
        </Head>
        <body>
          <Main />
          {/* <NextScript /> */}

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: clientSideJS }}
          /> */}

          {/* {isProduction && (
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: serviceWorkerRegistration }}
              />

              <script
                async={true}
                src={
                  "https://www.googletagmanager.com/gtag/js?id=UA-45226320-5"
                }
              />

              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: GA }}
              />
            </>
          )} */}
        </body>
      </Html>
    );
  }
}

// const clientSideJS = `
//   document.addEventListener('DOMContentLoaded', event => {
//     const checkbox = document.querySelector('input[name=dark]')
//     document.querySelector('select[name=language]').addEventListener('change', submit)
//     document.querySelector('select[name=time]').addEventListener('change', submit)
//     checkbox.addEventListener('change', submit)

//     function submit () {
//       checkbox.value = checkbox.checked
//       document.tune.submit()
//     }
//   })
// `;

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

// const GA = `
//   window.dataLayer = window.dataLayer || [];
//   function gtag () {
//     dataLayer.push(arguments);
//   }

//   gtag('js', new Date());
//   gtag('config', 'UA-45226320-5');
// `;
