import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { postEvent } from "@telegram-apps/sdk";
import { retrieveLaunchParams } from "@tma.js/sdk";
import WebApp from "@twa-dev/sdk";
import Points from "./pages/Points/Points";
import Account from "./pages/Account/Account";
import Main from "./pages/Main/Main";
import MobileNav from "./layouts/MobileNav/MobileNav";
// import Header from "./layouts/Header/Header";
import Preloader from "./modules/Preloader/Preloader";
import "./shared/styles/index.scss";

function App() {
  useEffect(() => {
    try {
      const params = retrieveLaunchParams();

      if (params) {
        postEvent("web_app_setup_swipe_behavior", {
          allow_vertical_swipe: false,
        });
        postEvent("web_app_set_header_color", { color: "#18222E" });
        WebApp.expand();
      }
    } catch (e) {
      console.log("not twa");
    }
  }, []);

  return (
    <>
      <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
        <BrowserRouter>
          <RecoilRoot>
            {/* <Header /> */}
            <MobileNav />
            <Preloader />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/points" element={<Points />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </RecoilRoot>
        </BrowserRouter>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
