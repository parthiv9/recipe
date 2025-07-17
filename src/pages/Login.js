import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import Logo from "../assets/img/core-img/logo.png"

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (login(email, password)) {
            navigate("/");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <Container className="h-100">
            <Row className="h-100 align-items-center justify-content-center">
                <Col xxl={4}>
                    <h3>Login</h3>
                    <img src={Logo} className="my-3" />

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Login</Button>
                        <div className="mt-3 text-center">
                            Don't have an account? <Link to="/register">Register</Link>
                        </div>
                    </Form>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
