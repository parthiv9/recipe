import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../components/BreadCrumbs";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY || "your_default_key";
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        setRecipe(response.data);
      } catch (err) {
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const saveToFavorites = () => {
    if (!recipe) return;

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadySaved = storedFavorites.some((r) => r.id === recipe.id);

    if (!alreadySaved) {
      storedFavorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      alert("Recipe saved to favorites!");
      navigate("/saved");
    } else {
      alert("Recipe already in favorites.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading recipe...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <Container>
      <Breadcrumbs />
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded mt-4"
      />

      <p
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <button
        onClick={saveToFavorites}
        className="mt-6 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded transition duration-200"
      >
        Save to Favorites
      </button>
    </Container>
  );
};

export default RecipePage;
