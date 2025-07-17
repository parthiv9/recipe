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
  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);

  useEffect(() => {
    const loggedInFlag = localStorage.getItem("hasLoggedInOnce");
    if (loggedInFlag === "true") {
      setHasLoggedInOnce(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("hasLoggedInOnce", "true");
      setHasLoggedInOnce(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
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

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && (
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
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes that require at least one login ever */}
        <Route
          path="/"
          element={
            hasLoggedInOnce ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/recipe/:id"
          element={
            hasLoggedInOnce ? <RecipePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/all-recipes"
          element={
            hasLoggedInOnce ? <AllRecipes /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/saved"
          element={
            hasLoggedInOnce ? <Saved /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/contact-us"
          element={
            hasLoggedInOnce ? <Contact /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/about"
          element={
            hasLoggedInOnce ? <AboutUs /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
