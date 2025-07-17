import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark-emphasis">
            View Details
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecipeCard;
