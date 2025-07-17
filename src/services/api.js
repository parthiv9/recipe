import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async ({
  query = "",
  number = 10,
  offset = 0,
  sort,
}) => {
  try {
    const res = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        number,
        offset,
        sort: sort !== "all" ? sort : undefined,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching recipes:", error?.response?.data || error.message);
    return {
      results: [],
      totalResults: 0,
    };
  }
};

export const fetchRecipeById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}/information`, {
    params: { apiKey: API_KEY },
  });
  return res.data;
};

export const fetchPopularRecipes = async (number = 3) => {
  try {
    const res = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        number,
        sort: "popularity",
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Failed to fetch popular recipes:", error.response?.data || error.message);
    return [];
  }
};

export const fetchRecipesByCategory = async (category, number = 6) => {
  try {
    const res = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: category,
        number,
        sort: "popularity",
      },
    });
    return res.data.results;
  } catch (error) {
    console.error(`Failed to fetch recipes for category "${category}":`, error);
    return [];
  }
};
