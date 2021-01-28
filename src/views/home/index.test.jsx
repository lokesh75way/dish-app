import {
  renderWithProvider,
  fireEvent,
  screen,
} from '../../testingUtils/renders';
import Home from './index';

describe('Home Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<Home />);
    expect(screen.getByText(RegExp('Recipes'))).toBeInTheDocument();
  });

  test('add recipe button', () => {
    renderWithProvider(<Home />);
    const addRecipe = screen.getByTestId('add-recipe');
    fireEvent.click(addRecipe);
    expect(screen.getByTestId('recipe-form')).toBeInTheDocument();
  });
});
