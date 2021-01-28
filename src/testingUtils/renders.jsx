import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';

const customRender = (ui, options) => render(ui, { ...options });

function renderWithProvider(ui) {
  return {
    ...customRender(<Provider store={store}>{ui}</Provider>),
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
export { renderWithProvider };
