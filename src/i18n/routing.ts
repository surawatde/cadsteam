import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "th", "zh", "ja", "vi", "km", "lo", "my"],
  defaultLocale: "en",
  localePrefix: "never",
});

