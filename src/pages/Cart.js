import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cartRecipes")) || [];
        setCartItems(stored);
    }, []);

    const removeFromCart = (id) => {
        const updated = cartItems.filter((r) => r.id !== id);
        setCartItems(updated);
        localStorage.setItem("cartRecipes", JSON.stringify(updated));
    };

    return (
        <Container className="py-4">
            <h3>My Recipe Cart</h3>
            {cartItems.length === 0 ? (
                <p>No recipes in your cart.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Ready In (min)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((recipe, idx) => (
                            <tr key={recipe.id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        style={{ width: "60px" }}
                                    />
                                </td>
                                <td>{recipe.title}</td>
                                <td>{recipe.readyInMinutes} min</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(recipe.id)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Cart;
