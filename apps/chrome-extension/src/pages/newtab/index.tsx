import React from "react";
import { createRoot } from "react-dom/client";
import Newtab from "@pages/newtab/Newtab";
import "@pages/newtab/index.css";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

refreshOnUpdate("pages/newtab");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);

  root.render(<Newtab />);
}

init();
