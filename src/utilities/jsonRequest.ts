import { utilQsString } from "./url";

export function getJson<T>(
  url: string,
  params: any,
  handler: (result: T) => void
) {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const result = JSON.parse(request.responseText);

      handler(result as T);
    }
  });

  request.open("Get", `${url}?${utilQsString(params)}`);

  request.send();
}
