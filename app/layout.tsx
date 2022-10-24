import { headers } from "next/headers";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import getQueryData from "../helpers/query-data";

import "./root.css";

export default function RootLayout({ children }) {
  const time = 8;
  const language = "overall";

  return (
    <html lang="en">
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
        <div className="hero">
          <Navbar time={time} language={language} />

          <div className="container">
            {children}

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
