import {
  renderWithProvider,
  screen,
  fireEvent,
} from '../../../testingUtils/renders';
import * as redux from 'react-redux';
import RecipeFilters from './index';
import { recipes } from '../../../testingUtils/fixtures/recipes.fixtures';

describe('RecipeFilters Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<RecipeFilters />);
  });

  test('Ingredient select dropdown', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(recipes);
    renderWithProvider(<RecipeFilters />);
    const ingredientDropdown = screen.getByTestId('ingredient-dropdown');
    expect(ingredientDropdown).toBeInTheDocument();
    const selectNode = ingredientDropdown.childNodes[0].childNodes[0];
    fireEvent.change(selectNode);
  });
});
