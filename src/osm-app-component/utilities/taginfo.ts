import { Filter } from "../control/Filters";

export function printTagInfoList(filters: Filter[]) {
  console.info(
    JSON.stringify(
      [...new Set(filters.flatMap((f) => f.tags))].map((f) => {
        const keyValue = f.split("=");
        if (keyValue.length > 1 && keyValue[1] !== "*") {
          return { key: keyValue[0], value: keyValue[1] };
        }
        return { key: keyValue[0] };
      })
    )
  );
}
