// import React, { useEffect, useState } from "react";
// import {
//     fetchRecipes as fetchRecipesAPI,
//     fetchRecipesByCategory,
// } from "../services/api";
// import {
//     Container,
//     Row,
//     Col,
//     Form,
//     InputGroup,
//     Button,
//     Pagination,
// } from "react-bootstrap";
// import RecipeCard from "../components/RecipeCard";
// import { HELPER } from "../services";

// const RECIPES_PER_PAGE = 12;

// const AllRecipes = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [loading, setLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sort, setSort] = useState("all");
//     const [page, setPage] = useState(1);
//     const [totalResults, setTotalResults] = useState(0);

//     const fetchRecipes = async () => {
//         try {
//             setLoading(true);
//             setRecipes([]);
//             let result = [];

//             const offset = (page - 1) * RECIPES_PER_PAGE;

//             if (searchQuery.trim()) {
//                 result = await fetchRecipesAPI({
//                     query: searchQuery,
//                     number: RECIPES_PER_PAGE,
//                     offset,
//                 });
//             } else if (selectedCategory !== "all") {
//                 result = await fetchRecipesByCategory(selectedCategory, offset);
//             } else {
//                 result = await fetchRecipesByCategory("main course", offset); // default
//             }

//             setRecipes(result.results || []);
//             setTotalResults(result.totalResults || result.length || 0);
//         } catch (error) {
//             HELPER.toaster?.error?.("Failed to fetch recipes.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRecipes();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [page, selectedCategory]);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         setPage(1);
//         fetchRecipes();
//     };

//     const totalPages = Math.ceil(totalResults / RECIPES_PER_PAGE);

//     return (
//         <Container className="py-4">
//             <h2 className="mb-4 text-center">All Recipes</h2>

//             <Row className="align-items-center mb-4">
//                 <Col md={4}>
//                     <Form.Select
//                         value={sort}
//                         onChange={(e) => setSort(e.target.value)}
//                         aria-label="Sort recipes"
//                     >
//                         <option value="all">All</option>
//                         <option value="popularity">Popularity</option>
//                         <option value="healthiness">Healthiness</option>
//                         <option value="time">Preparation Time</option>
//                         <option value="price">Price</option>
//                     </Form.Select>
//                 </Col>
//                 <Col md={8}>
//                     <Form onSubmit={handleSearchSubmit}>
//                         <InputGroup>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search recipes..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <Button type="submit" variant="primary">
//                                 Search
//                             </Button>
//                         </InputGroup>
//                     </Form>
//                 </Col>
//             </Row>

//             {loading ? (
//                 <p className="text-center">Loading recipes...</p>
//             ) : recipes.length === 0 ? (
//                 <p className="text-center">No recipes found.</p>
//             ) : (
//                 <>
//                     <Row className="gx-4 gy-4">
//                         {recipes.map((recipe) => (
//                             <Col lg={3} md={4} sm={6} xs={12} key={recipe.id}>
//                                 <RecipeCard recipe={recipe} />
//                             </Col>
//                         ))}
//                     </Row>

//                     {totalPages > 1 && (
//                         <Pagination className="justify-content-center mt-4">
//                             <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
//                             <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />

//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
//                                 p === page ||
//                                     p === 1 ||
//                                     p === totalPages ||
//                                     (p >= page - 1 && p <= page + 1) ? (
//                                     <Pagination.Item
//                                         key={p}
//                                         active={p === page}
//                                         onClick={() => setPage(p)}
//                                     >
//                                         {p}
//                                     </Pagination.Item>
//                                 ) : p === page - 2 || p === page + 2 ? (
//                                     <Pagination.Ellipsis key={`ellipsis-${p}`} disabled />
//                                 ) : null
//                             )}

//                             <Pagination.Next
//                                 onClick={() => setPage(page + 1)}
//                                 disabled={page === totalPages}
//                             />
//                             <Pagination.Last
//                                 onClick={() => setPage(totalPages)}
//                                 disabled={page === totalPages}
//                             />
//                         </Pagination>
//                     )}
//                 </>
//             )}
//         </Container>
//     );
// };

// export default AllRecipes;

// src/pages/AllRecipes.js
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
