import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Ui/Spinner";
import { HELPER } from "../services";
import { fetchRecipes as fetchRecipesAPI } from "../services/api";
import Breadcrumbs from "../components/BreadCrumbs";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("all");

  const RECIPES_PER_PAGE = 12;

  const fetchRecipes = async (query = "") => {
    try {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * RECIPES_PER_PAGE;
      const results = await fetchRecipesAPI({
        query,
        number: RECIPES_PER_PAGE,
        offset,
        sort,
      });
      setRecipes(results || []);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
      HELPER.toaster?.error?.("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input from SearchBar
  const handleSearch = (query) => {
    setPage(1);
    fetchRecipes(query);
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  return (
    <Container fluid="md" className="py-4">
      <Breadcrumbs />
      {/* Top Controls: Search and Sort */}
      <Row className="align-items-center justify-content-between gx-2 mb-3">
        <Col xxl={6} xl={6} lg={6} md={6}>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col xxl={2} xl={3} lg={3} md={6}>
          <Form.Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort recipes"
          >
            <option value="all">All</option>
            <option value="popularity">Popularity</option>
            <option value="healthiness">Healthiness</option>
            <option value="time">Preparation Time</option>
            <option value="price">Price</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Loader */}
      {loading && <Spinner />}

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Recipes Grid */}
      <Row className="gy-4 gx-3">
        {recipes.map((recipe) => (
          <Col key={recipe.id} xxl={3} xl={4} lg={4} md={6} sm={12}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 bg-light border rounded"
        >
          Prev
        </button>
        <span className="fw-bold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-2 bg-light border rounded"
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default Home;
