import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./osm-app-component/App";
import { Trans, useTranslation } from "react-i18next";
import { attributes } from "./client/attributes";
import externalResources from "./client/externalResources.json";
import { filters } from "./client/filters";

import "./client/initI18next";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Logo() {
  const { t } = useTranslation();

  return (
    <>
      <img
        className="community-centre-icon"
        src="https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg"
        style={{ width: "24px", verticalAlign: "text-bottom" }}
      />{" "}
      {t("meta.titleShort")}
    </>
  );
}

function Intro() {
  const { t } = useTranslation();

  return (
    <>
      <h4>{t("intro.title")}</h4>

      <p>{t("intro.tagline")}</p>
      <p>{t("intro.description")}</p>

      <p>
        <Trans
          i18nKey="intro.osm"
          components={{
            o: <a href="https://www.openstreetmap.org" />,
            e: <a href="#" className="edit" />,
          }}
        ></Trans>
      </p>

      <p>
        <Trans
          i18nKey="intro.license"
          components={{
            l: (
              <a href="https://github.com/ToastHawaii/priceless-map/blob/master/LICENSE" />
            ),
            c: <a href="https://github.com/ToastHawaii/priceless-map" />,
          }}
        ></Trans>
      </p>

      <div className="responsive-table">
        <table>
          <tbody>
            <tr>
              <td>
                <a href="/?lang=en">English</a>
              </td>
              <td>
                <a href="/?lang=de">Deutsch</a>
              </td>
              {/* <td>
          <a href="/?lang=es">Español</a>
        </td>
        <td>
          <a href="/?lang=fr">Français</a>
        </td>
        <td>
          <a href="/?lang=pl">Polski</a>
        </td>
        <td>
          <a href="https://hosted.weblate.org/engage/priceless-map/">
            {t("intro.translate")}
          </a>
        </td> */}
            </tr>
          </tbody>
        </table>
      </div>
      {/*
<p>
  <a href="https://hosted.weblate.org/engage/priceless-map/">
    <img
      src="https://hosted.weblate.org/widgets/priceless-map/-/svg-badge.svg"
      alt={t("intro.translationStatus")}
    />
  </a>
</p> */}

      <hr />

      <ul>
        <li>
          <Trans
            i18nKey="intro.joinCommunity"
            components={{
              m: <a href="https://usergroups.openstreetmap.de/" />,
              t: <a href="https://community.osm.be/" />,
            }}
          ></Trans>
        </li>
        <li>
          <a href="https://wiki.openstreetmap.org/wiki/How_to_contribute">
            {t("intro.contribute")}
          </a>
        </li>
        <li>
          <a href="https://osm-apps.zottelig.ch/">{t("intro.moreApps")}</a>
        </li>
        <li>
          <a href="https://wiki.openstreetmap.org/wiki/User:ToastHawaii">
            {t("intro.aboutMe")}
          </a>
        </li>
      </ul>
    </>
  );
}

root.render(
  <React.StrictMode>
    <App
      logo={<Logo />}
      intro={<Intro />}
      filters={filters}
      attributes={attributes}
      externalResources={externalResources}
    />
  </React.StrictMode>
);
