/**
 * Import Dependencies
 */
import { combineReducers } from "redux";

/**
 * Import Reducers
 * All Reducers used in the App must be declared here!
 */

import RecipeReducer from "./recipe/reducer";

/**
 * Combine the Reducers
 */
const reducers = combineReducers({
  recipe: RecipeReducer,
});

/**
 * Export the combined Reducers
 */
export default reducers;
