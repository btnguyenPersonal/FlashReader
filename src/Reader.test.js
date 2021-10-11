import React from 'react';
import Reader from './Reader.js';
import {render, fireEvent, screen} from '@testing-library/react';

test('initial render', () => {
  render(<Reader />);
  expect(screen.getByText('faster'));
  expect(screen.getByText('slower'));
  expect(screen.getByText('||'));
  expect(screen.getByText('>>'));
  expect(screen.getByText('<<'));
  expect(screen.getByText('<'));
  expect(screen.getByText('>'));
});

test('sets inital speed and progress correctly', () => {
  const reader = render(<Reader />);
  expect(screen.getByText('Progress: 0%'));
  expect(screen.getByText('Speed: 300 WPM'));
  expect(screen.getByText('Level: 0'));
});

test('faster button changes the speed', async () => {
  const reader = render(<Reader />);
  fireEvent.click(reader.getByText('faster'));
  expect(screen.getByText('Speed: 329 WPM'));
  expect(screen.getByText('Level: 1'));
});
