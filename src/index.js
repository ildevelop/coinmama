import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ColorModeScript, theme, ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
