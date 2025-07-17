import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Breadcrumbs from "../components/BreadCrumbs";
import { fetchRecipes as fetchRecipesAPI } from "../services/api";
import { HELPER } from "../services";
import Preloader from "../components/Ui/Preloader";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const RECIPES_PER_PAGE = 12;

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const offset = (page - 1) * RECIPES_PER_PAGE;
            const data = await fetchRecipesAPI({
                query: searchQuery,
                number: RECIPES_PER_PAGE,
                offset,
                sort,
            });
            setRecipes(data.results || []);
        } catch (err) {
            HELPER.toaster?.error?.("Failed to fetch recipes.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setPage(1);
        setSearchQuery(query);
    };

    useEffect(() => {
        fetchRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sort, searchQuery]);

    return (
        <Container fluid="md" className="py-4">
            <Row className="align-items-center justify-content-between gx-2 mb-3">
                <Col md={6}>
                    <SearchBar onSearch={handleSearch} />
                </Col>
                <Col md={4}>
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

            {/* Loading Spinner */}
            {loading && <Preloader />}

            {/* Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Recipe Grid */}
            <Row className="gy-4 gx-3">
                {recipes.map((recipe) => (
                    <Col key={recipe.id} xxl={3} xl={4} lg={4} md={6} sm={6}>
                        <RecipeCard recipe={recipe} />
                    </Col>
                ))}
            </Row>

            {/* Pagination Controls */}
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

export default AllRecipes;
