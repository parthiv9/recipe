import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      setRecipe(res.data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const saveToFavorites = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!stored.some((r) => r.id === recipe.id)) {
      stored.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(stored));
      alert("Saved to favorites!");
      navigate("/saved");
    }
  };

  if (loading) return <p className="text-center">Loading recipe...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded mt-4"
      />
      <p
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
        className="mt-4"
      />
      <button
        onClick={saveToFavorites}
        className="mt-4 bg-green-500 px-4 py-2 text-white rounded"
      >
        Save to Favorites
      </button>
    </div>
  );
};

export default RecipePage;
