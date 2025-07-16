import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      {/* <div className="">
        <img src={recipe.image} alt={recipe.title} className="" />
        <h2 className="">{recipe.title}</h2>
        <Link to={`/recipe/${recipe.id}`} className="">
          View Details
        </Link>
      </div> */}

      <Card>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Link to={`/recipe/${recipe.id}`} className="">
            View Details
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecipeCard;
