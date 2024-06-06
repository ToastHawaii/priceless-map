// Copyright (C) 2020 Markus Peloso
//
// This file is part of Priceless map.
//
// Priceless map is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Priceless map is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Priceless map.  If not, see <http://www.gnu.org/licenses/>.

import * as fs from "fs";
import prettier from "prettier";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { useTranslation } from "react-i18next";
import "./initI18next";

function Logo() {
  return (
    <img
      className="community-centre-icon"
      src="https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg"
      style={{ width: "24px", verticalAlign: "text-bottom" }}
    />
  );
}

render({
  logo: <Logo />,
  color: "#da532c",
  locals: [
    {
      code: "en",
      baseUrl: "/",
    },
    {
      code: "de",
      baseUrl: "/de/",
    },
  ],
});

function render(customize: {
  logo: React.ReactElement;
  color: string;
  locals: {
    code: string;
    baseUrl: string;
  }[];
}) {
  for (const local of customize.locals) {
    const html = ReactDOMServer.renderToStaticMarkup(
      <App lang={local.code} color={customize.color} baseUrl={local.baseUrl}>
        {customize.logo}
      </App>
    );
    const htmlWDoc = "<!DOCTYPE html>" + html;
    const prettyHtml = prettier.format(htmlWDoc, { parser: "html" });
    const outputFile = `./src/_temp/${local.code}/index.html`;
    writeFileSyncRecursive(outputFile, prettyHtml);
  }
}

function writeFileSyncRecursive(filename, content?, charset?) {
  // -- normalize path separator to '/' instead of path.sep,
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = filename.replace(/\\/g, "/");

  // -- preparation to allow absolute paths as well
  let root = "";
  if (filepath[0] === "/") {
    root = "/";
    filepath = filepath.slice(1);
  } else if (filepath[1] === ":") {
    root = filepath.slice(0, 3); // c:\
    filepath = filepath.slice(3);
  }

  // -- create folders all the way down
  const folders = filepath.split("/").slice(0, -1); // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + "/";
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath;
    },
    root // first 'acc', important
  );

  // -- write file
  fs.writeFileSync(root + filepath, content, charset);
}

function App(attributes: {
  lang: string;
  color: string;
  baseUrl: string;
  children: any;
}) {
  let { t } = useTranslation();
  let a = (key: string) => t(key, { lng: attributes.lang });
  return (
    <html className="help" lang={attributes.lang}>
      <head>
        <title>{a("meta.title")}</title>
        <meta charSet="utf-8" />
        <link rel="manifest" href={`/manifest.${attributes.lang}.json`} />
        <meta
          name="viewport"
          content="width=device-width, target-densitydpi=device-dpi, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content={a("meta.description")} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={a("meta.titleShort")} />
        <meta
          name="apple-mobile-web-app-title"
          content={a("meta.titleShort")}
        />
        <meta name="theme-color" content={attributes.color} />
        <meta name="msapplication-navbutton-color" content={attributes.color} />
        <meta name="msapplication-starturl" content="/" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color={attributes.color}
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content={attributes.color} />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />

        <link rel="stylesheet" href="/lib/leaflet.css" type="text/css" />
        <link rel="stylesheet" href="/lib/OverPassLayer.css" type="text/css" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          media="print"
        />

        <meta name="monetization" content="$ilp.uphold.com/BwpBDr48YqPi" />

        <script src="/serviceWorkerRegister.js"></script>
      </head>

      <body>
        <div id="map"></div>
        <h1>
          <a href={`${attributes.baseUrl}docs/`}>
            {attributes.children}
            {a("meta.titleShort")}
          </a>
        </h1>
        <div id="filters">
          <div className="right-collapse">
            <i className="fas fa-list"></i>
          </div>
          <div className="filters-clear" style={{ display: "none" }}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="box">
          <div className="container">
            <form className="search">
              <button className="geo" type="button">
                <i className="far fa-dot-circle"></i>
              </button>
              <input
                type="search"
                id="osm-search"
                placeholder={a("search.placeholder")}
                required
              />
              <button className="icon" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <div className="info">
            <h4></h4>
            <span className="text"></span>
            <hr />
            <small>
              <details>
                <summary>
                  <strong>{a("info.osmTags")}</strong>
                </summary>
                <br />
                <div className="wiki"></div>
                <strong>{a("info.query")}</strong>
                <code className="query"></code>
                <a className="link" target="_blank">
                  {a("info.overpassTurbo")}
                </a>
              </details>
            </small>
            <small className="external"></small>
          </div>
          <button className="close-button">×</button>
        </div>

        <div className="menu-group collapsed">
          <button
            className="menu note help-text"
            type="button"
            title={a("menu.note")}
          >
            <i className="fas fa-comment-alt"></i>
          </button>
          <button
            className="menu edit help-text"
            type="button"
            title={a("menu.edit")}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button
            className="menu share help-text"
            type="button"
            title={a("menu.share")}
          >
            <i className="fas fa-share-alt"></i>
          </button>
          <button
            className="menu theme theme-mode-dark-visible help-text"
            type="button"
            title={a("menu.theme")}
          >
            <i className="fas fa-circle"></i>
          </button>
          <button
            className="menu theme theme-mode-light-visible help-text"
            type="button"
            title={a("menu.theme")}
          >
            <i className="far fa-circle"></i>
          </button>
          <button
            className="menu theme theme-mode-system-visible help-text"
            type="button"
            title={a("menu.theme")}
          >
            <i className="fas fa-adjust"></i>
          </button>
          <a className="menu about help-text" title={a("menu.about")}>
            <i className="fas fa-info"></i>
          </a>
          <a
            className="menu donate help-text"
            target="_blank"
            title={a("menu.donate")}
          >
            <i className="fas fa-mug-hot"></i>
          </a>
        </div>
        <a className="menu toggle">
          <i className="fas fa-ellipsis-v"></i>
        </a>
        <script
          async
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
          crossOrigin="anonymous"
        ></script>
        <script
          async
          type="text/javascript"
          src="https://taginfo.openstreetmap.org/js/taglists.js"
        ></script>
      </body>
    </html>
  );
}
