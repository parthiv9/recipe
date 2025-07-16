import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async ({ query = "", number = 10, offset = 0, sort }) => {
    const res = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
            apiKey: API_KEY,
            query,
            number,
            offset,
            sort: sort !== "all" ? sort : undefined,
        },
    });
    return res.data.results;
};
