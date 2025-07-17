import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import Saved from "./pages/Saved";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Contact from "./pages/Contact";
import Breadcrumbs from "./components/BreadCrumbs";

import RecipeDetails from "./assets/img/bg-img/breadcumb3.jpg";
import ContactImg from "./assets/img/bg-img/breadcumb4.jpg";
import AboutImg from "./assets/img/bg-img/breadcumb1.jpg";
import SaveImg from "./assets/img/bg-img/breadcumb2.jpg";

function App() {
  const location = useLocation();

  const breadcrumbMap = [
    {
      path: /^\/recipe\/\d+$/,
      title: "Recipe Detail",
      backgroundImage: RecipeDetails,
    },
    { path: "/saved", title: "Saved Recipes", backgroundImage: SaveImg },
    { path: "/contact-us", title: "Contact Us", backgroundImage: ContactImg },
    { path: "/about", title: "About Us", backgroundImage: AboutImg },
  ];

  const currentConfig =
    breadcrumbMap.find((entry) =>
      typeof entry.path === "string"
        ? entry.path === location.pathname
        : entry.path.test(location.pathname)
    ) || null;

  const showBreadcrumb = location.pathname !== "/" && currentConfig;

  return (
    <>
      <Header />
      {showBreadcrumb && (
        <Breadcrumbs
          title={currentConfig.title}
          backgroundImage={currentConfig.backgroundImage}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
