import React from 'react';
import Reader from './Reader.js';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

test('initial render', async () => {
  render(<Reader />);
  expect(screen.getByText('faster'));
  expect(screen.getByText('slower'));
  expect(screen.getByText('||'));
  expect(screen.getByText('>>'));
  expect(screen.getByText('<<'));
  expect(screen.getByText('<'));
  expect(screen.getByText('>'));
})
