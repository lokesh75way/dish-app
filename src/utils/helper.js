/**
 * Save Recipes in local storage
 *
 * @param {Array} data
 * @returns {Boolean}
 */
export const saveRecipes = (data) => {
  if (!data) return false;
  localStorage.setItem('recipes', JSON.stringify(data));
  return true;
};

/**
 * Get Recipes from local storage
 *
 * @returns {Array}
 */
export const getRecipes = () => {
  const recipes = localStorage.getItem('recipes');
  if (recipes && recipes.length > 0) return JSON.parse(recipes);
  return [];
};

/**
 *  Filtered Recipes by ingredients name
 *
 * @param {Array} recipes
 * @param {Array} selectedIngredients
 *
 * @returns {Array}
 */
export const getFilteredRecipes = (recipes = [], selectedIngredients = []) => {
  const filteredRecipes = [];
  if (recipes && recipes.length > 0) {
    recipes.forEach((recipe) => {
      const ingredientList = [];
      recipe.ingredients.forEach((ingredient) => {
        ingredientList.push(
          Object.values(ingredient.name).toString().replace(/,/g, '')
        );
      });
      if (
        selectedIngredients.every((ingredientName) =>
          ingredientList.includes(ingredientName)
        )
      ) {
        filteredRecipes.push(recipe);
      }
    });
  }
  return filteredRecipes;
};

/**
 * Validate image url
 *
 * @param {String} imageUrl
 * @returns {Boolean}
 */
export const validateImageUrl = (imageUrl) => {
  const URL_REGEX = /^(https?:\/\/)+[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?/gi;
  return URL_REGEX.test(imageUrl);
};
