import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import cartStore from "./redux/cartStrore";

createRoot(document.getElementById("root")).render(
  <Provider store={cartStore}>
    <App />
  </Provider>
);
