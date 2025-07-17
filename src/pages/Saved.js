import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Container, Table, Button } from "react-bootstrap";

const Saved = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);

    const cartStored = JSON.parse(localStorage.getItem("cartRecipes")) || [];
    setCart(cartStored);
  }, []);

  // Handle reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...favorites];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setFavorites(reordered);
    localStorage.setItem("favorites", JSON.stringify(reordered));
  };

  // Remove an item
  const handleRemove = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Move recipe to cart
  const handleMoveToCart = (recipe) => {
    const exists = cart.find((item) => item.id === recipe.id);
    if (exists) return;

    const updatedCart = [...cart, recipe];
    setCart(updatedCart);
    localStorage.setItem("cartRecipes", JSON.stringify(updatedCart));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Saved Recipes</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="saved-recipes">
          {(provided) => (
            <Table
              striped
              bordered
              hover
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="align-middle"
            >
              <thead className="table-dark">
                <tr>
                  <th className="align-middle">Order</th>
                  <th className="align-middle">Image</th>
                  <th className="align-middle">Title</th>
                  <th className="align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((recipe, index) => {
                  const inCart = cart.some((item) => item.id === recipe.id);
                  return (
                    <Draggable
                      key={recipe.id}
                      draggableId={recipe.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? "#f8f9fa" : "",
                            cursor: "move",
                          }}
                        >
                          <td className="align-middle">{index + 1}</td>
                          <td className="align-middle">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              style={{ width: "80px", height: "auto" }}
                            />
                          </td>
                          <td className="align-middle">{recipe.title}</td>
                          <td className="align-middle d-flex gap-2 flex-wrap">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRemove(recipe.id)}
                            >
                              Remove
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleMoveToCart(recipe)}
                              disabled={inCart}
                            >
                              {inCart ? "In Cart" : "Move to Cart"}
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Saved;
