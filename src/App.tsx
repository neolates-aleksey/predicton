import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layouts/Header/Header";
import BlocksGrid from "./modules/BlocksGrid/BlocksGrid";
import Points from "./pages/Points/Points";
import MobileNav from "./layouts/MobileNav/MobileNav";
import Account from "./pages/Account/Account";
import { retrieveLaunchParams } from "@tma.js/sdk";
import "./shared/styles/index.scss";
import { postEvent } from "@telegram-apps/sdk";

function App() {
  useEffect(() => {}, []);

  useEffect(() => {
    try {
      const params = retrieveLaunchParams();
      console.log(params);

      params &&
        postEvent("web_app_setup_swipe_behavior", {
          allow_vertical_swipe: false,
        });
    } catch (e) {
      console.log("use mock");
    }
  }, []);

  return (
    <>
      <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
        <BrowserRouter>
          <RecoilRoot>
            <Header />
            <MobileNav />
            <Routes>
              <Route path="/" element={<BlocksGrid />} />
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
