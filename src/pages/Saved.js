import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Container, Table, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Saved = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const getKey = () => `favorites_${user?.email}`;

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem(getKey())) || [];
      setFavorites(stored);
    }
  }, [user]);

  const saveFavorites = (updated) => {
    setFavorites(updated);
    localStorage.setItem(getKey(), JSON.stringify(updated));
  };

  // Handle reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...favorites];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    saveFavorites(reordered);
  };

  // Remove an item
  const handleRemove = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    saveFavorites(updated);
  };

  if (!user) {
    return (
      <Container className="text-center my-5">
        <h4>Please log in to view saved recipes.</h4>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="text-center my-4">Saved Recipes</h2>
      {favorites.length === 0 ? (
        <p className="text-center">No saved recipes yet.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="saved-recipes">
            {(provided) => (
              <div
                className="table-responsive"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Table striped bordered hover className="align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Order</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((recipe, index) => (
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
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                style={{ width: "80px", height: "auto" }}
                              />
                            </td>
                            <td>{recipe.title}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemove(recipe.id)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </Table>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Container>
  );
};

export default Saved;
