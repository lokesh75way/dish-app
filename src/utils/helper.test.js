import {
  saveRecipes,
  getRecipes,
  getFilteredRecipes,
  validateImageUrl,
} from './helper';
import {
  recipes,
  selectedIngredients,
} from '../testingUtils/fixtures/recipes.fixtures';

// used to mock localStorage for the recipes key
const setRecipesInLocalStorage = (recipes = []) => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(recipes));
};

describe('saveRecipes function', () => {
  test('without params', () => {
    const isSavedRecipes = saveRecipes();
    expect(isSavedRecipes).toBeFalsy();
  });
  test('with params', () => {
    const isSavedRecipes = saveRecipes(recipes);
    expect(isSavedRecipes).toBeTruthy();
  });
});

describe('getRecipes function', () => {
  test('without recipes', () => {
    setRecipesInLocalStorage();
    const recipesData = getRecipes();
    expect(recipesData.length).toBeLessThanOrEqual(0);
  });

  test('with recipes', () => {
    setRecipesInLocalStorage(recipes);
    const recipesData = getRecipes();
    expect(recipesData.length).toBeGreaterThanOrEqual(1);
  });
});

describe('getFilteredRecipes function', () => {
  test('without selectedIngredients prop', () => {
    const filteredData = getFilteredRecipes(recipes);
    expect(filteredData.length).toBeGreaterThanOrEqual(1);
  });
  test('with selectedIngredients prop', () => {
    const filteredData = getFilteredRecipes(recipes, selectedIngredients);
    expect(filteredData.length).toBeGreaterThanOrEqual(1);
    expect(filteredData).toEqual(recipes);
  });
});

describe('validateImageUrl function', () => {
  test('with valid image url', () => {
    const isValidImageUrl = validateImageUrl(
      'https://www.fakeUrl.com/image.png'
    );
    expect(isValidImageUrl).toBeTruthy();
  });

  test('with invalid image url', () => {
    const isValidImageUrl = validateImageUrl('invalid-image-url/image.png');
    expect(isValidImageUrl).toBeFalsy();
  });
});
