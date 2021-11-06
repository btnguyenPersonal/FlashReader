import React from "react";
import Reader from "./Reader";
import { cleanup, render, fireEvent } from "@testing-library/react";

afterEach(cleanup);

test("initial render", () => {
  const { getByText } = render(<Reader />);
  expect(getByText("<<"));
  expect(getByText("<"));
  expect(getByText("-"));
  expect(getByText("Pause"));
  expect(getByText("+"));
  expect(getByText(">>"));
  expect(getByText(">"));
});

test("sets inital speed and progress correctly", () => {
  const { getByText } = render(<Reader />);
  expect(getByText("Pause"));
  expect(getByText("Progress: 0%"));
  expect(getByText("Speed: 150 WPM"));
});

test("faster button increases the speed", () => {
  const { getByText, getByTestId } = render(<Reader />);
  const btnSpeedup = getByTestId("btn-speedUp");
  fireEvent.click(btnSpeedup);
  expect(getByText("164 WPM"));
});
/*

  test("slower button lowers the speed and level", () => {
    let reader = render(<Reader />);
    fireEvent.click(reader.getByText("slower"));
    expect(screen.getByText("Level: -1"));
  });

  test("the pause button pauses the playback", () => {
    let reader = render(<Reader />);
    fireEvent.click(reader.getByText("||"));
    expect(screen.getByText("||")).to.be.false;
  });

  test("the faster button does not increase over the max speed", () => {
    let reader = render(<Reader />);
    for (let i = 0; i < 25; i++) {
      fireEvent.click(reader.getByText("faster"));
    }
    expect(screen.getByText("Speed: 2000 WPM"));
    expect(screen.getByText("Level: MAX"));
  });

  test("the slower button does not decrease under the min speed", () => {
    let reader = render(<Reader />);
    for (let i = 0; i < 25; i++) {
      fireEvent.click(reader.getByText("slower"));
    }
    expect(screen.getByText("Speed: 44 WPM"));
    expect(screen.getByText("Level: -20"));
  });

  test("next chapter button increases chapter", () => {
    let reader = render(<Reader />);
    fireEvent.click(reader.getByText(">"));
    expect(screen.getByText("Chapter 2"));
  });

  test("prev chapter button decreases chapter", () => {
    let reader = render(<Reader />);
    fireEvent.click(reader.getByText(">"));
    expect(screen.getByText("Chapter 2"));
    fireEvent.click(reader.getByText("<"));
    expect(screen.getByText("Chapter 1"));
  });

  test("prev chapter does not go to chapter -1", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("next chapter does not go to past max chapter", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("WPM indicator is correct", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("pause indicator is correct", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("progress indicator is correct", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("title bar shows correct title", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("reader shows words in correct order", () => {
    let reader = render(<Reader />);
    //TODO
  });

  test("reader shows words at correct speeds", () => {
    let reader = render(<Reader />);
    //TODO
  });
  */
