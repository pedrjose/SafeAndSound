import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  GenerateWalletPage,
  GenerateBlockPage,
  MineBlockPage,
  FindWalletPage,
  WalletOverviewPage,
} from "./Pages.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenerateWalletPage />} />
          <Route path="/menu/:publicAddress" element={<HomePage />} />
          <Route path="/gerar-bloco" element={<GenerateBlockPage />} />
          <Route path="/minerar-bloco" element={<MineBlockPage />} />
          <Route path="/buscar-carteira" element={<FindWalletPage />} />
          <Route
            path="/wallet-overview/:publicAddress"
            element={<WalletOverviewPage />}
          />
          <Route path="/*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
