import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Header from "./layouts/Header/Header";
import BlocksGrid from "./modules/BlocksGrid/BlocksGrid";
import "./shared/styles/index.scss";
import { useState, useEffect } from "react";
import { socket } from "./api/ws";

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
        <Header />
        <div className="container">
          <BlocksGrid />
        </div>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
