import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import Logo from "../assets/img/core-img/logo.png"

const Register = () => {
    const { register } = useAuth();
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
        if (register(email, password)) {
            navigate("/");
        } else {
            setError("User already exists.");
        }
    };

    return (
        <Container className="h-100">
            <Row className="align-items-center justify-content-center h-100">
                <Col xxl={4} xl={4} lg={6} md={6}>
                    <h3>Register</h3>
                    <img src={Logo} className="my-3" />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">Register</Button>
                    </Form>
                    <div className="mt-3 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-decoration-none">
                            Login here
                        </Link>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Register;
