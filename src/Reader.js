import React, { useState, useEffect } from "react";
import { book } from "./Book.js";
import moment from "moment";
import "./App.css";
import mousetrap from "mousetrap";

let chapter = getInitalBookmark();
let speed = 200;
let wpm = 150;
let index = 0;

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
  mousetrap.bind("f", function () {
    if (document.fullscreenElement == null) {
      var element = document.getElementById("root");
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
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
  mousetrap.bind("d", function () {
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
    wpm += 10;
    speed = WPMtoSpeed(wpm);
  }

  function slower() {
    if (wpm > 10) {
      wpm -= 10;
      speed = WPMtoSpeed(wpm);
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
    return wpm;
  }

  function WPMtoSpeed(wpm) {
    return 60 * (500 / wpm);
  }

  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [time, setTime] = useState(moment());
  const [isPaused, setIsPaused] = useState(false);
  const [lastTime, setLastTime] = useState(moment());

  let words = book.chapter[currentChapter - 1].content.split(/\s/);

  let content = (
    <div className="columns">
      <div className="panel panel-default">
        <div className="panel-heading">
          {book.chapter[currentChapter - 1].title}
        </div>
        <div className="panel-body">
          <h2>{getWord(time, lastTime, isPaused)}</h2>
          <button
            className="mediaButton"
            onClick={() => {
              setChapter(currentChapter - 1);
            }}
            data-testid="btn-decrementchapter"
          >
            {"<<"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              skipBack();
            }}
            data-testid="btn-skipBack"
          >
            {"<"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              slower();
            }}
            data-testid="btn-slowDowm"
          >
            -
          </button>
          <button
            className="pauseButton"
            onClick={() => {
              pause();
            }}
            data-testid="btn-pauseButton"
          >
            {isPaused ? "Play" : "Pause"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              faster();
            }}
            data-testid="btn-speedUp"
          >
            +
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              skipAhead();
            }}
            data-testid="btn-skipAhead"
          >
            {">"}
          </button>
          <button
            className="mediaButton"
            onClick={() => {
              setChapter(currentChapter + 1);
            }}
            data-testid="btn-incrementchapter"
          >
            {">>"}
          </button>
          <div className="valueIndicator">
            Progress: {Math.floor((100 * index) / words.length)}%
          </div>
          <div className="valueIndicator">Speed: {getWPM()} WPM</div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    // eslint-disable-next-line
    const interval = setInterval(() => setTime(moment()), 1000 / 60);
  }, []);

  return content;
}
