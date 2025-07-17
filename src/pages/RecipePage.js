import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchRecipeById } from "../services/api";
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
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const saveToFavorites = () => {
    if (!recipe) {
      return;
    }

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

      <Row className="justify-content-center">
        <Col xxl={9}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-100 rounded mt-4"
          />
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <div
            className="mt-4 recipe--content"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
          <Button
            variant="primary"
            onClick={saveToFavorites}
            className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded transition duration-200"
          >
            Save to Favorites
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipePage;
