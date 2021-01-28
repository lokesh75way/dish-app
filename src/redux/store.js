import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

/**
 * Prepare the Redux Store
 */
const composedMiddlewares = applyMiddleware(thunk);

const storeEnhancers = composeWithDevTools({
  name: "Recipe Store",
})(composedMiddlewares);

const store = createStore(reducers, undefined, storeEnhancers);

export default store;
