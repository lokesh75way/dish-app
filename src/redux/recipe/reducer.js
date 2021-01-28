/**
 * Import Dependencies
 */
import { SET_RECIPES } from './constants';

/**
 * Set Initial State
 */
export const initialState = {
  recipes: [],
};

/**
 * Define the reducer with actions
 *
 * @param {Object} state
 * @param {Object} action
 */
const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.data };

    default:
      return state;
  }
};

/**
 * Export the reducer
 */
export default RecipeReducer;
