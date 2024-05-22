import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Header from "./layouts/Header/Header";
import BlocksGrid from "./modules/BlocksGrid/BlocksGrid";
import "./shared/styles/index.scss";
import { useState, useEffect } from "react";
import { socket } from "./api/ws";
import { RecoilRoot } from "recoil";

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
        <RecoilRoot>
          <Header />
          {/* <div className="container"> */}
          <BlocksGrid />
          {/* </div> */}
        </RecoilRoot>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
