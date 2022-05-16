/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'jest-fetch-mock';
import { expect, test } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import Dashboard from '../Components/Dashboard';
import { rootReducer } from '../reduxFeatures/reduxStore';

const store = configureStore({ reducer: rootReducer });

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

afterEach(cleanup);

test('displays a map', async () => {
  const dashboard = render(
    <StaticRouter>
      <Dashboard />
    </StaticRouter>,
    { wrapper: Wrapper }
  );
  const map = await dashboard.findByTestId('map');
  expect(map).toBeDefined;
});

// const renderWithRedux = (
//   component,
//   { initialState, store = configureStore({ reducer: rootReducer }) } = {}
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

// afterEach(cleanup);

// it('checks initial state is equal to 0', () => {
//   const { getByTestId } = renderWithRedux(
//     <StaticRouter>
//       <Dashboard />
//     </StaticRouter>
//   );
//   expect(getByTestId('map')).toHaveTextContent('0');
// });
