import Document, { Main } from 'next/document';
import { extractCritical } from 'emotion-server';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);

    return {
      ...page,
      ...styles,
    };
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>Trends</title>
          <meta name="name" content="trends" />
          <meta name="description" content="trends trending" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#3362c6" />

          <style
            dangerouslySetInnerHTML={{
              __html: `* { box-sizing: border-box !important; } html { font-size: 10px } body { font-size: 1.6rem; margin: 0; }`,
            }}
          />

          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

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

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: clientSideJS }}
          />

          {!publicRuntimeConfig.isDev && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.googleAnalytics}`}
              />

              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: GA }}
              />
            </>
          )}
        </body>
      </html>
    );
  }
}

const clientSideJS = `
  document.addEventListener('DOMContentLoaded', event => {
    document.querySelector('select[name=language]').addEventListener('change', () => document.tune.submit())
    document.querySelector('select[name=time]').addEventListener('change', () => document.tune.submit())

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/_next/static/sw.js', { scope: "/" }).then(registration => {
          console.log('SW registered: ', registration)
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
      })
    }
  })
`;

const GA = `
  window.dataLayer = window.dataLayer || [];
  function gtag () {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-45226320-5');
`