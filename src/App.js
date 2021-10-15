import React from "react";
import { Coins } from "./components/Coins/Coins";
import Header from "./components/Header/Header";
import { ColorModeSwitcher } from "./features/ColorModeSwitcher";

function App() {
  return (
    <div>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Header />
      <Coins />
    </div>
  );
}

export default App;
