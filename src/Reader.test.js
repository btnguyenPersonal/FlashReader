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
  let reader = render(<Reader />);
  expect(screen.getByText('Progress: 0%'));
  expect(screen.getByText('||'));
  expect(screen.getByText('Speed: 300 WPM'));
  expect(screen.getByText('Level: 0'));
});

test('faster button increases the speed and level', () => {
  let reader = render(<Reader />);
  fireEvent.click(reader.getByText('faster'));
  expect(screen.getByText('Level: 1'));
});

test('slower button lowers the speed and level', () => {
  let reader = render(<Reader />);
  fireEvent.click(reader.getByText('slower'));
  expect(screen.getByText('Level: -1'));
});

test('the pause button pauses the playback', () => {
  let reader = render(<Reader />);
  fireEvent.click(reader.getByText('||'));
  expect(screen.getByText('||')).to.be.false;
});

test('the faster button does not increase over the max speed', () => {
  let reader = render(<Reader />);
  for (let i = 0; i < 25; i++) {
    fireEvent.click(reader.getByText('faster'));
  }
  expect(screen.getByText('Speed: 2000 WPM'));
  expect(screen.getByText('Level: MAX'));
});

test('the slower button does not decrease under the min speed', () => {
  let reader = render(<Reader />);
  for (let i = 0; i < 25; i++) {
    fireEvent.click(reader.getByText('slower'));
  }
  expect(screen.getByText('Speed: 44 WPM'));
  expect(screen.getByText('Level: -20'));
});

test('next chapter button increases chapter', () => {
  let reader = render(<Reader />);
  fireEvent.click(reader.getByText('>'));
  expect(screen.getByText('Chapter 2'));
});

test('prev chapter button decreases chapter', () => {
  let reader = render(<Reader />);
  fireEvent.click(reader.getByText('>'));
  expect(screen.getByText('Chapter 2'));
  fireEvent.click(reader.getByText('<'));
  expect(screen.getByText('Chapter 1'));
});

test('prev chapter does not go to chapter -1', () => {
  let reader = render(<Reader />);
  //TODO
});

test('next chapter does not go to past max chapter', () => {
  let reader = render(<Reader />);
  //TODO
});

test('WPM indicator is correct', () => {
  let reader = render(<Reader />);
  //TODO
});

test('pause indicator is correct', () => {
  let reader = render(<Reader />);
  //TODO
});

test('progress indicator is correct', () => {
  let reader = render(<Reader />);
  //TODO
});

test('title bar shows correct title', () => {
  let reader = render(<Reader />);
  //TODO
});

test('reader shows words in correct order', () => {
  let reader = render(<Reader />);
  //TODO
});

test('reader shows words at correct speeds', () => {
  let reader = render(<Reader />);
  //TODO
});
