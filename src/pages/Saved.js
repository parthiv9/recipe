import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "../components/RecipeCard";

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
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Recipes</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="saved-recipes">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=""
            >
              {favorites.map((recipe, index) => (
                <Draggable
                  key={recipe.id.toString()}
                  draggableId={recipe.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <RecipeCard recipe={recipe} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Saved;
