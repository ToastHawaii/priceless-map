import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
import { isIOS } from "../createOverPassLayer";
import { funding } from "../funding";

export function Menu({
  filterOptions,
  offers,
  onAbout,
}: {
  filterOptions: {
    id: number;
    group: string;
    subgroup?: string;
    order?: number;
    value: string;
    icon: string;
    button?: string;
    query: string;
    color: string;
    edit: string[];
    tags: string[];
  }[];
  offers: string[];
  onAbout: () => void;
}) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);
  const map = useMap();

  function handleEdit() {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    let presets = "";
    for (const o of offers) {
      const p = filterOptions
        .filter((f) => `${f.group}/${f.value}` === o)
        .map((o) => o.edit.map((t) => t.replace(/=/gi, "/")).join(","))
        .filter((o) => o)
        .join(",");
      presets += (presets && p ? "," : "") + p;
    }

    if (isIOS())
      window.location.href = `https://gomaposm.com/edit?center=${latlng.lat},${latlng.lng}&zoom=${zoom}`;
    else
      window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
        latlng.lat
      }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  }

  return (
    <>
      <div className={`menu-group ${collapsed ? "collapsed" : ""}`}>
        <NoteButton />
        <button
          className="menu edit help-text"
          type="button"
          title={t("menu.edit")}
          onClick={handleEdit}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className="menu share help-text"
          type="button"
          title={t("menu.share")}
        >
          <i className="fas fa-share-alt"></i>
        </button>
        <ThemeButton />
        <button
          className="menu about help-text"
          title={t("menu.about")}
          onClick={() => {
            setCollapsed(true);
            onAbout();
          }}
        >
          <i className="fas fa-info"></i>
        </button>
        <a
          className="menu donate help-text"
          target="_blank"
          title={t("menu.donate")}
          href={t("code") === "de" ? funding.de : funding.en}
        >
          <i className="fas fa-mug-hot"></i>
        </a>
      </div>
      <a
        className="menu toggle"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
    </>
  );
}

function ThemeButton() {
  const { t } = useTranslation();

  const startTheme = localStorage.getItem("theme") || "system";
  if (!startTheme) {
    localStorage.setItem("theme", startTheme);
  }

  function setThemeClass(theme: string) {
    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if ((theme === "system" && isSystemThemeDark) || theme === "dark") {
      document.documentElement.classList.add("theme-mode-dark");
    } else {
      document.documentElement.classList.remove("theme-mode-dark");
    }

    if (theme === "system") {
      document.documentElement.classList.add("theme-mode-system");
    } else {
      document.documentElement.classList.remove("theme-mode-system");
    }
  }

  setThemeClass(startTheme);

  const handelClick = () => {
    let theme = localStorage.getItem("theme") || "system";

    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isSystemThemeDark) {
      if (theme === "system") {
        theme = "light";
      } else if (theme === "light") {
        theme = "dark";
      } else if (theme === "dark") {
        theme = "system";
      }
    } else {
      if (theme === "system") {
        theme = "dark";
      } else if (theme === "dark") {
        theme = "light";
      } else if (theme === "light") {
        theme = "system";
      }
    }

    localStorage.setItem("theme", theme);
    setThemeClass(theme);
  };

  return (
    <>
      <button
        className="menu theme theme-mode-dark-visible help-text"
        type="button"
        title={t("menu.theme")}
        onClick={handelClick}
      >
        <i className="fas fa-circle"></i>
      </button>
      <button
        className="menu theme theme-mode-light-visible help-text"
        type="button"
        title={t("menu.theme")}
        onClick={handelClick}
      >
        <i className="far fa-circle"></i>
      </button>
      <button
        className="menu theme theme-mode-system-visible help-text"
        type="button"
        title={t("menu.theme")}
        onClick={handelClick}
      >
        <i className="fas fa-adjust"></i>
      </button>
    </>
  );
}

function NoteButton() {
  const { t } = useTranslation();
  const map = useMap();

  const handelClick = () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    window.location.href = `https://www.openstreetmap.org/note/new#map=${zoom}/${latlng.lat}/${latlng.lng}`;
  };

  return (
    <button
      className="menu note help-text"
      type="button"
      title={t("menu.note")}
      onClick={handelClick}
    >
      <i className="fas fa-comment-alt"></i>
    </button>
  );
}
