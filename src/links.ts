import { Attribute } from "./Generator";
import { toUrl, toFacebookUrl, toWikipediaUrl } from "./utilities/url";

const template = (url: string, icon: string) =>
  `<a href="${url}" target="_blank"><i class="${icon} fa-lg"></i></a>&ensp;`;

export const links: Attribute<{ website?: string }>[] = [
  {
    check: (tags, _value, model) =>
      !!(
        tags.website ||
        (tags.wikipedia
          ? `https://wikipedia.org/wiki/${tags.wikipedia}`
          : ``) ||
        model.website ||
        tags.url ||
        tags["contact:website"] ||
        tags["facebook"] ||
        tags["contact:facebook"] ||
        tags["opening_hours:url"]
      ),
    template: (_local, tags, _value, model) =>
      template(
        toUrl(tags.website) ||
          toWikipediaUrl(tags.wikipedia) ||
          toUrl(model.website) ||
          toUrl(tags.url) ||
          toUrl(tags["contact:website"]) ||
          toFacebookUrl(tags["facebook"]) ||
          toFacebookUrl(tags["contact:facebook"]) ||
          toUrl(tags["opening_hours:url"]) ||
          "",
        "fas fa-globe"
      )
  },
  {
    check: tags => !!(tags.email || tags["contact:email"]),
    template: (_local, tags) =>
      template(
        "mailto:" + (tags.email || tags["contact:email"]),
        "far fa-envelope"
      )
  },
  {
    check: tags =>
      !!(tags.phone || tags["contact:phone"] || tags["contact:mobile"]),
    template: (_local, tags) =>
      template(
        "tel:" +
          (tags.phone || tags["contact:phone"] || tags["contact:mobile"]),
        "fas fa-mobile-alt"
      )
  }
];
