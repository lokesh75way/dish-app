import { renderWithProvider, screen } from '../../../testingUtils/renders';
import Recipes from './index';
import * as redux from 'react-redux';
import {
  recipes,
  selectedIngredients,
} from '../../../testingUtils/fixtures/recipes.fixtures';

describe('Recipes Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<Recipes />);
    expect(screen.getByText(RegExp('Name'))).toBeInTheDocument();
  });

  test('without props', () => {
    renderWithProvider(<Recipes />);
    expect(screen.getByText(RegExp('No recipe found'))).toBeInTheDocument();
  });

  test('with props', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(recipes);
    renderWithProvider(<Recipes selectedIngredients={selectedIngredients} />);
    expect(screen.getByText(RegExp(recipes[0].name))).toBeInTheDocument();
  });
});
