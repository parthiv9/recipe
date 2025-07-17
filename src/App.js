import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // This flag will track if user logged in at least once
  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);

  useEffect(() => {
    // Load persisted login flag from localStorage
    const loggedInFlag = localStorage.getItem("hasLoggedInOnce");
    if (loggedInFlag === "true") {
      setHasLoggedInOnce(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Set the flag on login
      localStorage.setItem("hasLoggedInOnce", "true");
      setHasLoggedInOnce(true);
    }
  }, [isAuthenticated]);

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
    { path: "/cart", title: "Cart", backgroundImage: AboutImg },
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
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <Header />
          {showBreadcrumb && (
            <Breadcrumbs
              title={currentConfig.title}
              backgroundImage={currentConfig.backgroundImage}
            />
          )}
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/all-recipes" element={<AllRecipes />} />

        <Route
          path="/saved"
          element={
            <Saved />
          }
        />

        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </>
  );
}

export default App;
