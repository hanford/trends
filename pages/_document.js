import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

const myScript = `
  function cookieCutter (doc) {
    if (!doc) doc = {};
    if (typeof doc === 'string') doc = { cookie: doc };
    if (doc.cookie === undefined) doc.cookie = '';

    var self = {};
    self.get = function (key) {
        var splat = doc.cookie.split(/;\s*/);
        for (var i = 0; i < splat.length; i++) {
            var ps = splat[i].split('=');
            var k = unescape(ps[0]);
            if (k === key) return unescape(ps[1]);
        }
        return undefined;
    };

    self.set = function (key, value, opts) {
        if (!opts) opts = {};
        var s = escape(key) + '=' + escape(value);
        if (opts.expires) s += '; expires=' + opts.expires;
        if (opts.path) s += '; path=' + escape(opts.path);
        if (opts.domain) s += '; domain=' + escape(opts.domain);
        if (opts.secure) s += '; secure';
        doc.cookie = s;
        return s;
    };
    return self;
  };

  const cookies = cookieCutter(document)

  document.addEventListener("DOMContentLoaded", (event) => {

    // document.querySelector('form[name=tune]').addEventListener('submit', () => {
    //   console.log(document.tune.language.value)
    //   console.log(document.tune.time.value)
    // })

    document.querySelector('select[name=language]').addEventListener('change', () => {
      cookies.set('language', document.tune.language.value)

      document.tune.submit()
    })

    document.querySelector('select[name=time]').addEventListener('change', () => {
      cookies.set('time', document.tune.time.value)

      document.tune.submit()
    })
  })
`

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

          <script type='text/javascript' dangerouslySetInnerHTML={{__html: myScript}} />
        </body>
      </html>
    )
  }
}
