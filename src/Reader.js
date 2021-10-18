import React, { useState, useEffect } from "react";
import { book } from "./Book.js";
import moment from "moment";
import "./App.css";
import mousetrap from "mousetrap";

let chapter = getInitalBookmark();
let speed = 200;
let index = 0;
let counter = 0;

function getInitalBookmark() {
  const bookmark = parseInt(localStorage.getItem("bookmark"));
  return bookmark > 0 && bookmark < book.chapter.length ? bookmark : 1;
}

function incrementIndex() {
  index++;
  return true;
}

export default function Reader() {
  //keybindings
  mousetrap.bind("k", function () {
    pause();
  });
  mousetrap.bind("space", function () {
    pause();
    return false;
  });
  mousetrap.bind("l", function () {
    skipAhead();
  });
  mousetrap.bind("j", function () {
    skipBack();
  });
  mousetrap.bind("-", function () {
    slower();
  });
  mousetrap.bind("=", function () {
    faster();
  });
  mousetrap.bind("s", function () {
    slower();
  });
  mousetrap.bind("f", function () {
    faster();
  });
  mousetrap.bind("up", function () {
    skipAhead();
    return false;
  });
  mousetrap.bind("down", function () {
    skipBack();
    return false;
  });
  mousetrap.bind("left", function () {
    setChapter(currentChapter - 1);
  });
  mousetrap.bind("right", function () {
    setChapter(currentChapter + 1);
  });

  function pause() {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }

  function faster() {
    if (counter < 20) {
      counter++;
      speed /= 1.1;
      speed = Math.floor(speed + 0.5);
    }
  }

  function slower() {
    if (counter > -20) {
      counter--;
      speed *= 1.1;
      speed = Math.floor(speed + 0.5);
    }
  }

  function skipAhead() {
    index += 50;
  }

  function skipBack() {
    index < 50 ? (index = 0) : (index -= 50);
  }

  function setChapter(c) {
    index = 0;
    localStorage.setItem("bookmark", JSON.stringify(c));
    setCurrentChapter(c);
    setLastTime(moment());
  }

  function getWord(time, lastIndex, isPaused) {
    if (1 < Math.floor((time - lastTime) / speed) && !isPaused) {
      if (index < words.length - 2) {
        incrementIndex();
        setLastTime(moment());
      } else {
        setChapter(currentChapter + 1);
      }
    }
    return words[index];
  }

  function getWPM() {
    return Math.floor(60 * (500 / speed));
  }

  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [time, setTime] = useState(moment());
  const [isPaused, setIsPaused] = useState(false);
  const [lastTime, setLastTime] = useState(moment());

  let words = book.chapter[currentChapter - 1].content.split(/\s/);

  let content = (
    <div className="columns">
      <button
        className="button"
        onClick={() => {
          setChapter(currentChapter - 1);
        }}
      >
        {"<"}
      </button>
      <div className="panel panel-default">
        <div className="panel-heading">
          {book.chapter[currentChapter - 1].title}
        </div>
        <div className="panel-body">
          <h2>{getWord(time, lastTime, isPaused)}</h2>
          <button
            className="mediaButton"
            onClick={() => {
              skipBack();
            }}
          >
            {"<<"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              slower();
            }}
          >
            slower
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              pause();
            }}
          >
            {isPaused ? ">" : "||"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              faster();
            }}
          >
            faster
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              skipAhead();
            }}
          >
            {">>"}
          </button>
          <div className="valueIndicator">
            Progress: {Math.floor((100 * index) / words.length)}%
          </div>
          <div className="valueIndicator">Speed: {getWPM()} WPM</div>
          <div className="valueIndicator">
            Level: {counter < 20 ? counter : "MAX"}
          </div>
        </div>
      </div>
      <button
        className="button"
        onClick={() => {
          setChapter(currentChapter + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );

  useEffect(() => {
    // eslint-disable-next-line
    const interval = setInterval(() => setTime(moment()), 1000 / 60);
  }, []);

  return content;
}
