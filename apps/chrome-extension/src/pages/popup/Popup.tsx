import logo from "@assets/svg/good-cookie.svg";
import bookmarkAdd from "@assets/svg/bookmark-add.svg";
import "@pages/popup/popup.scss";
import withSuspense from "@src/shared/hoc/withSuspense";
import { useEffect, useState } from "react";
import { Button3D } from "./Button3D";
import { TextField } from "./TextField";
import * as yup from "yup";
import { webAppUrl } from "./../constants";

const Popup = () => {
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function validateUrl() {
      const isUrlValid = await yup.string().url().isValid(url);
      setIsError(!isUrlValid);
      console.log(isUrlValid);
    }
    validateUrl();
  }, [url]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        setUrl(activeTab.url || "");
      }
    });
  }, []);

  const handleSaveBookmark = (e: any) => {
    e.preventDefault();
    if (isError) return;

    const queryParams = `?sharedBmUrl=${url}`;
    chrome.tabs.create({ url: webAppUrl + queryParams });
  };

  return (
    <div className="app">
      <header>
        <img src={logo} className="logo" alt="logo" />
        <h1>Cookied!!</h1>
      </header>
      <main>
        <h2>Bookmark your web page</h2>
        <form>
          <div className="fields">
            <p>You can edit the URL and proceed to save your bookmark</p>
            <TextField
              type="text"
              placeholder="Enter URL"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              error={isError}
              errorText="Invalid URL"
              label="Bookmark URL"
            />
          </div>
          <div className="btnWrap">
            <Button3D type="submit" onClick={handleSaveBookmark}>
              <span className="submitBtnContent">
                Proceed to Save <img src={bookmarkAdd} />
              </span>
            </Button3D>
          </div>
        </form>
      </main>
    </div>
  );
};

export default withSuspense(Popup);
