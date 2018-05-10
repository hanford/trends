import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const page = renderPage()
    const styles = extractCritical(page.html)

    return {
      ...page,
      ...styles
    }
  }

  render () {
    return (
      <html lang='en'>
        <Head>
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <title>gitwho</title>
          <meta name='name' content='Gitwho' />
          <meta name='description' content='Gitwho trending' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name="theme-color" content="#000" />

          <style dangerouslySetInnerHTML={{ __html: `* { box-sizing: border-box !important; } html { font-size: 10px } body { font-size: 1.6rem; }` }} />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
          <link rel='manifest' href='/static/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
