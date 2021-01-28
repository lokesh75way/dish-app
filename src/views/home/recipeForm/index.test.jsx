import { renderWithProvider, screen } from '../../../testingUtils/renders';
import RecipeForm from './index';

describe('RecipeForm Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<RecipeForm />);
    expect(screen.getByText(RegExp('Add Recipe'))).toBeInTheDocument();
  });
});
