import logo from "@assets/svg/good-cookie.svg";
import "@pages/popup/popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";


const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div className="App">
       <header>
          Cookied 
       </header>
    </div>
  );
};

export default withSuspense(Popup);
