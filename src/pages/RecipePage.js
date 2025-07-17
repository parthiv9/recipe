import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchRecipeById } from "../services/api";
import Preloader from "../components/Ui/Preloader";

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
    return <Preloader />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="receipe-slider">
              <img src={recipe?.image} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </div>

      <div className="receipe-content-area">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="receipe-headline my-5">
                <h2>{recipe?.title}</h2>
                <div className="receipe-duration">
                  <h6>Prep: {recipe?.preparationMinutes ? recipe?.preparationMinutes : '-'} mins</h6>
                  <h6>Cook: {recipe?.readyInMinutes} mins</h6>
                  <h6>Yields: {recipe?.servings} Servings</h6>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="receipe-ratings text-right my-5">
                <div className="ratings">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <a type="button" className="btn delicious-btn" onClick={() => saveToFavorites()}>Save to favorites</a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="single-preparation-step d-flex">
                <h4>01.</h4>
                <p dangerouslySetInnerHTML={{ __html: recipe?.summary }}></p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="ingredients">
                <h4>Ingredients</h4>

                {recipe?.extendedIngredients.map((data, id) => {
                  return (
                    <div className="custom-control custom-checkbox" key={id}>
                      <input type="checkbox" className="custom-control-input" id={data?.id} />
                      <label className="custom-control-label" htmlFor={data?.id}>{data?.name}</label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
