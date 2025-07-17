import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import Saved from "./pages/Saved";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Breadcrumbs from "./components/BreadCrumbs";

import RecipeDetails from "./assets/img/bg-img/breadcumb3.jpg";
import ContactImg from "./assets/img/bg-img/breadcumb4.jpg";
import AboutImg from "./assets/img/bg-img/breadcumb1.jpg";
import SaveImg from "./assets/img/bg-img/breadcumb2.jpg";
import { useEffect, useState } from "react";
import Preloader from "./components/Ui/Preloader";
import AllRecipes from "./pages/AllRecipes";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2s delay
    return () => clearTimeout(timer);
  }, []);

  const breadcrumbMap = [
    {
      path: /^\/recipe\/\d+$/,
      title: "Recipe Detail",
      backgroundImage: RecipeDetails,
    },
    { path: "/saved", title: "Saved Recipes", backgroundImage: SaveImg },
    { path: "/all-recipes", title: "Recipes", backgroundImage: SaveImg },
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
  if (loading) {
    return <Preloader />;
  }
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
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
