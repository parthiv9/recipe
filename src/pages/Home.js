import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { HELPER } from "../services";
import Spinner from "../components/Ui/Spinner";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("all");

  const fetchRecipes = async (query = "") => {
    try {
      setLoading(true);
      const offset = (page - 1) * 12;
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query,
            number: 12,
            offset,
            sort,
            apiKey: process.env.REACT_APP_API_KEY,
          },
        }
      );
      setRecipes(res.data.results);
      setError(null);
    } catch (err) {
      console.error(err);
      HELPER.toaster.error("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setPage(1);
    fetchRecipes(query);
  };

  useEffect(() => {
    fetchRecipes();
  }, [page, sort]);

  return (
    <Container fluid="md">
      <Row className="align-items-center justify-content-between gx-2">
        <Col xxl={6} xl={3} lg={6} md={6}>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col xxl={2} xl={3} lg={3} md={6}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="all">All</option>
            <option value="popularity">Popularity</option>
            <option value="healthiness">Healthiness</option>
            <option value="time">Preparation Time</option>
            <option value="price">Price</option>
          </Form.Select>
        </Col>
      </Row>
      {loading && <Spinner />}
      {error && <p className="">{error}</p>}
      <Row className="gy-3 gx-3">
        {recipes.map((recipe) => (
          <Col xxl={3} xl={3} lg={4} md={4}>
            <RecipeCard key={recipe.id} recipe={recipe} />
          </Col>
        ))}
      </Row>
      <div className="flex justify-center gap-2 my-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default Home;
