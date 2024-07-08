import { TFunction } from "i18next";
import { Filter } from "../control/Filters";

export function printTagInfoList(
  t: TFunction<"translation", undefined>,
  urlBase: string,
  filters: Filter[]
) {
  console.info(
    JSON.stringify(
      [...new Set(filters.flatMap((f) => f.tags))].map((tag) => {
        const fs = filters.filter((o) => o.tags.find((t2) => t2 === tag));
        const keyValue = tag.split("=");
        if (keyValue.length > 1 && keyValue[1] !== "*") {
          return {
            key: keyValue[0],
            value: keyValue[1],
            description: fs
              .map(
                (fs) =>
                  `${t(`group.${fs.group}`)}/${t(`type.${fs.value}.name`)}`
              )
              .join(", "),
            doc_url: `${urlBase}?offers=${fs[0].group}/${fs[0].value}&info=${fs[0].group}/${fs[0].value}`,
            icon_url: fs[0].icon.startsWith("/")
              ? new URL(fs[0].icon, urlBase).href
              : fs[0].icon,
          };
        }
        return {
          key: keyValue[0],
          description: fs
            .map(
              (fs) => `${t(`group.${fs.group}`)}/${t(`type.${fs.value}.name`)}`
            )
            .join(", "),
          doc_url: `${urlBase}?offers=${fs[0].group}/${fs[0].value}&info=${fs[0].group}/${fs[0].value}`,
          icon_url: fs[0].icon.startsWith("/")
            ? new URL(fs[0].icon, urlBase).href
            : fs[0].icon,
        };
      })
    )
  );
}
