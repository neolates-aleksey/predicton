import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Header from "./layouts/Header/Header";
import BlocksGrid from "./modules/BlocksGrid/BlocksGrid";
import "./shared/styles/index.scss";
import { useState, useEffect } from "react";
import { socket } from "./api/ws";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Points from "./pages/Points/Points";

function App() {
  // useEffect(() => {
  //   console.log(socket);

  //   socket.onmessage = function (event) {
  //     console.log(JSON.parse(event.data));
  //   };
  // }, []);

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
