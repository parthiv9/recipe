import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Container, Table, Button } from "react-bootstrap";

const Saved = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...favorites];
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
            <Table
              striped
              bordered
              hover
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((recipe, index) => (
                  <Draggable
                    draggableId={recipe.id.toString()}
                    index={index}
                    key={recipe.id}
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging ? "#f0f8ff" : "",
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
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Saved;
