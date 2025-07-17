import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "../components/RecipeCard";
import { Col, Container, Row, Button } from "react-bootstrap";

const Saved = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(favorites);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setFavorites(reordered);
    localStorage.setItem("favorites", JSON.stringify(reordered));
  };

  const handleRemove = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Saved Recipes</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="saved-recipes">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Row className="gx-3 gy-3">
                {favorites.map((recipe, index) => (
                  <Col
                    xxl={4}
                    xl={4}
                    lg={4}
                    md={6}
                    sm={12}
                    key={recipe.id.toString()}
                  >
                    <Draggable
                      draggableId={recipe.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="position-relative"
                        >
                          <RecipeCard recipe={recipe} />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-2"
                            onClick={() => handleRemove(recipe.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  </Col>
                ))}
                {provided.placeholder}
              </Row>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Saved;
