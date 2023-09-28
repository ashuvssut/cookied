import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Cookied!!",
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage", "activeTab", "tabs"],
  // options_page: "src/pages/options/index.html",
  // background: {
  //   service_worker: "src/pages/background/index.js",
  //   type: "module",
  // },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "34-logo.png",
  },
  // chrome_url_overrides: {
  //   newtab: "src/pages/newtab/index.html",
  // },
  icons: {
    "128": "128-logo.png",
  },
  // content_scripts: [
  //   {
  //     matches: ["http://*/*", "https://*/*", "<all_urls>"],
  //     js: ["src/pages/content/index.js"],
  //     // KEY for cache invalidation
  //     css: ["assets/css/contentStyle<KEY>.chunk.css"],
  //   },
  // ],
  // devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "128-logo.png",
        "34-logo.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
