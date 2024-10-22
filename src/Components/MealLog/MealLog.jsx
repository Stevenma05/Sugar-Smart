import React, { useState, useEffect } from 'react';
import "./MealLog.css";
import { getMealPlan } from '../../api/spoonacular'; // Import the API function

const MealLog = () => {
  const [meals, setMeals] = useState([]); // Store the list of meals
  const [currentMealIndex, setCurrentMealIndex] = useState(0); // Track the current meal index
  const [error, setError] = useState(''); // Store any error messages
  const [loading, setLoading] = useState(true); // Store the loading state

  // Function to fetch a meal plan from the API
  const fetchPlan = async () => {
    setLoading(true); // Set loading to true when fetching
    try {
      const data = await getMealPlan(); // Fetch the meal plan from API
      setMeals(data.results); // Store the fetched meals (updated for new structure)
      setCurrentMealIndex(0); // Reset to the first meal
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching meal plan:', err);
      setError('Failed to fetch the meal plan. Please try again.');
    } finally {
      setLoading(false); // Stop loading state after fetching
    }
  };

  // Fetch the meal plan when the component mounts
  useEffect(() => {
    fetchPlan(); // Call the fetch function on component mount
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Show error message

  // Get the current meal to display
  const currentMeal = meals[currentMealIndex];

  const handleNextMeal = () => {
    setCurrentMealIndex((prevIndex) => (prevIndex + 1) % meals.length); // Cycle to the next meal
  };

  return (
    <div className="meal-log">
      <h1>Meal Recommendations</h1>
  
      <button onClick={fetchPlan}>Refresh Meal</button>
  
      {loading && <p className="message loading">Loading...</p>}
      {error && <p className="message error">{error}</p>}
  
      {currentMeal && (
        <div className="current-meal">
          <h3>{currentMeal.title}</h3>
          <img src={currentMeal.image} alt={currentMeal.title} />
          <a
            className='food'
            href={`https://spoonacular.com/recipes/${currentMeal.title}-${currentMeal.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Recipe
          </a>
        </div>
      )}
  
      <button onClick={handleNextMeal}>Next Meal</button>
    </div>
  );  
};

export default MealLog;
