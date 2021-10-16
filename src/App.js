import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Coins } from "./components/Coins/Coins";
import Header from "./components/Header/Header";
import History from "./components/History/History";
import { ColorModeSwitcher } from "./features/ColorModeSwitcher";

function App() {
  return (
    <Router>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Switch>
        <Route exact path="/">
          <>
            <Header />
            <Coins />
          </>
        </Route>
        <Route path="/history">
          <History />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
