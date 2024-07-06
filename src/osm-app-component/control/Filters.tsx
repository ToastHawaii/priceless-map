import React from "react";
import { groupBy } from "../utilities/data";
import { useTranslation } from "react-i18next";
import { getQueryParams, setQueryParams } from "../utilities/url";

export type Filter = {
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
};

export function Filters({
  onOpen,
  onClose,
  onClear,
  collapsed,
  filterOptions,
  offers,
  onActivate,
  onDeactivate,
  onInfo,
}: {
  onOpen: () => void;
  onClose: () => void;
  onClear: () => void;
  collapsed: boolean;
  filterOptions: Filter[];
  offers: string[];
  onActivate: (filter: Filter) => void;
  onDeactivate: (filter: Filter) => void;
  onInfo: (filter: Filter) => void;
}) {
  const { t } = useTranslation();

  const groups = groupBy(
    filterOptions
      .sort((a, b) =>
        t("type." + a.value + ".name").localeCompare(
          t("type." + b.value + ".name")
        )
      )
      .sort((a, b) =>
        t("group." + a.group).localeCompare(t("group." + b.group))
      )
      .sort((a, b) => (a.subgroup || "").localeCompare(b.subgroup || ""))
      .sort((a, b) => (b.order || 1000) - (a.order || 1000)),
    "group"
  );

  return (
    <>
      <div id="filters" className={collapsed ? "right-collapsed" : ""}>
        <div
          className="right-collapse"
          onClick={() => {
            if (collapsed) {
              onOpen();
            } else {
              onClose();
            }
          }}
        >
          <i className="fas fa-list"></i>
        </div>
        {offers.length >= 1 ? (
          <div className="filters-clear" onClick={onClear}>
            <i className="fas fa-times"></i>
          </div>
        ) : null}
        {Object.keys(groups).map((k) => {
          const group = groups[k];
          const count = offers.filter((o) => o.startsWith(k + "/")).length;
          return (
            <details key={k}>
              <summary>
                <span className="count">{count ? `(${count})` : ""}</span>
                {t("group." + k)}
              </summary>
              {group
                .filter((g) => !g.subgroup)
                .map((f) => (
                  <React.Fragment key={`${k}/${f.value}`}>
                    <a
                      title={t("type." + f.value + ".name")}
                      href={`?offers=${k}/${f.value}&info=${k}/${f.value}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onInfo(f);
                      }}
                    >
                      <i className="fas fa-info-circle"></i>
                    </a>
                    <label className={"filter filter-" + k + "-" + f.value}>
                      <input
                        value={`${k}/${f.value}`}
                        type="checkbox"
                        checked={offers.includes(`${k}/${f.value}`)}
                        onChange={(e) => {
                          if (e.currentTarget.checked) {
                            onActivate(f);
                          } else {
                            onDeactivate(f);
                          }
                        }}
                      />
                      <div className="filter-background"></div>
                      <div className="filter-label">
                        <img
                          className={`${f.value}-icon`}
                          src={f.icon}
                          alt={t("type." + f.value + ".name")}
                        />{" "}
                        <span>{t("type." + f.value + ".name")}</span>
                      </div>
                    </label>
                  </React.Fragment>
                ))}
            </details>
          );
        })}
      </div>
    </>
  );
}
