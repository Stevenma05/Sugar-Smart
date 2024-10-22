// api/spoonacular.js
import axios from 'axios';

const API_KEY = 'e3c8bdb4313f4f0487d3616ac161475c';

// Function to fetch a ketogenic meal plan
export const getMealPlan = async () => {
  try {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&maxCarbs=100&maxProtein=60&maxCarbohydrates=25&sort=healthiness`
      );      
    return response.data; // Return the full response with meals and nutrients
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    throw error; // Propagate the error to handle it in the calling function
  }
};
