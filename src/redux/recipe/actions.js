/**
 * Import Dependencies
 */
import { SET_RECIPES } from "./constants";

/**
 * Set recipes
 *
 * @param {Array} data
 */
export const setRecipes = (data = []) => {
  return { type: SET_RECIPES, data };
};
