import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./styles/bootstrap.min.css";
import "./styles/classy-nav.min.css";
import "./styles/custom-icon.css";
import "./styles/font-awesome.min.css";
import "./styles/magnific-popup.css";
import "./styles/owl.carousel.min.css";
import "./styles/nice-select.min.css";
import { FormProvider } from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FormProvider>
    <Router>
      <App />
    </Router>
  </FormProvider>
);
