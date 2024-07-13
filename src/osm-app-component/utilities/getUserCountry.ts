import latest from "moment-timezone/data/meta/latest.json";

export function getUserCountry() {
  const timeZoneCityToCountry: { [city: string]: string } = {};

  Object.keys(latest.zones).forEach((z) => {
    const cityArr = z.split("/");
    const city = cityArr[cityArr.length - 1];
    timeZoneCityToCountry[city] = (latest.countries as any)[
      (latest.zones as any)[z].countries[0]
    ].name;
  });

  if (Intl) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var tzArr = userTimeZone.split("/");
    const userCity = tzArr[tzArr.length - 1];
    return timeZoneCityToCountry[userCity];
  }

  return undefined;
}
