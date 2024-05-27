import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./layouts/Header/Header";
import BlocksGrid from "./modules/BlocksGrid/BlocksGrid";
import Points from "./pages/Points/Points";
import "./shared/styles/index.scss";

function App() {
  return (
    <>
      <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
        <BrowserRouter>
          <RecoilRoot>
            <Header />
            <Routes>
              <Route path="/" element={<BlocksGrid />} />
              <Route path="/points" element={<Points />} />
            </Routes>
          </RecoilRoot>
        </BrowserRouter>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
