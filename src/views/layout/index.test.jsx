import { renderWithProvider } from '../../testingUtils/renders';
import Layout from './index';

describe('Layout Component', () => {
  test('It should render without errors', () => {
    renderWithProvider(<Layout />);
  });
});
