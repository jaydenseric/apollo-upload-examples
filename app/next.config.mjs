// @ts-check

/** @type {import("next").NextConfig} */
export default {
  env: {
    API_URI: /** @type {string} */ (process.env.API_URI),
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  pageExtensions: ["mjs"],
  reactStrictMode: true,
};
