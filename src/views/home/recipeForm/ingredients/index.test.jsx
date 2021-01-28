import {
  renderWithProvider,
  screen,
  fireEvent,
} from '../../../../testingUtils/renders';
import Ingredients from './index';
import { recipes } from '../../../../testingUtils/fixtures/recipes.fixtures';

describe('Ingredients Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<Ingredients />);
  });
  test('with props', () => {
    renderWithProvider(<Ingredients ingredients={recipes[0].ingredients} />);
    const nameInput = screen.getAllByTestId('name-input');
    fireEvent.change(nameInput[0]);
  });
});
