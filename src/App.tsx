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

function App() {
  const [first, setfirst] = useState<any>("");
  // function api(url, data) {
  //   let auth = "mock 1";
  //   try {
  //     const params = retrieveLaunchParams();
  //     auth = "twa " + params.initDataRaw;
  //   } catch (e) {
  //     console.log("use mock");
  //     auth = "mock 1";
  //   }
  //   return fetch(url, {...data, headers: {Authorization: auth, "Content-Type": "application/json"}})
  // }

  useEffect(() => {
    try {
      const params = retrieveLaunchParams();
      setfirst(params.initDataRaw);
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
