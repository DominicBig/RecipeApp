import axios from "axios";

const YOUR_APP_KEY = "e2318cedf165dcae2f2d871a1a01769f";
const YOUR_APP_ID = "05cd5b69";

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  return await axios.get(url);
};
