import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import Saved from "./pages/Saved";
import Header from "./components/layout/Header";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>    </>
  );
}

export default App;
