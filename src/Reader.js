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
  mousetrap.bind("f", function () { toggleFullscreen(); });
  mousetrap.bind("k", function () { pause(); });
  mousetrap.bind("space", function () { pause(); return false; });
  mousetrap.bind("l", function () { skipAhead(); });
  mousetrap.bind("j", function () { skipBack(); });
  mousetrap.bind("-", function () { slower(); });
  mousetrap.bind("=", function () { faster(); });
  mousetrap.bind("w", function () { for (let i = 0; i< 10; i++) {slower();} });
  mousetrap.bind("e", function () { for (let i = 0; i< 10; i++) {faster();} });
  mousetrap.bind("s", function () { slower(); });
  mousetrap.bind("d", function () { faster(); });
  mousetrap.bind("up", function () { skipAhead(); return false; });
  mousetrap.bind("down", function () { skipBack(); return false; });
  mousetrap.bind("left", function () { setChapter(currentChapter - 1); });
  mousetrap.bind("right", function () { setChapter(currentChapter + 1); });

  function toggleFullscreen() {
    if (document.fullscreenElement == null) {
      var element = document.getElementById("root");
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function pause() { isPaused ? setIsPaused(false) : setIsPaused(true); }

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

  function skipAhead() { index += 50; }

  function skipBack() { index < 50 ? (index = 0) : (index -= 50); }

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

  function getWPM() { return wpm; }

  function WPMtoSpeed(wpm) { return 60 * (500 / wpm); }

  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [time, setTime] = useState(moment());
  const [isPaused, setIsPaused] = useState(false);
  const [lastTime, setLastTime] = useState(moment());

  let words = book.chapter[currentChapter - 1].content.split(/\s/);

  let content = (
    <div className="panel panel-default">
      <div id="title" className="panel-heading">
        {book.chapter[currentChapter - 1].title}
      </div>
      <div className="panel-body">
        <h2 id="currentWord">{getWord(time, lastTime, isPaused)}</h2>
        <button id="btn-backChapter" className="mediaButton" onClick={() => { setChapter(currentChapter - 1); }} >
          {"<<"}
        </button>
        <button id="btn-skipBack" className="mediaButton" onClick={() => { skipBack(); }} >
          {"<"}
        </button>
        <button id="btn-slower" className="mediaButton" onClick={() => { slower(); }} >
          -
        </button>
        <button id="btn-pause" className="pauseButton" onClick={() => { pause(); }} >
          {isPaused ? "Play" : "Pause"}
        </button>
        <button id="btn-faster" className="mediaButton" onClick={() => { faster(); }} >
          +
        </button>
        <button id="btn-skipAhead" className="mediaButton" onClick={() => { skipAhead(); }} >
          {">"}
        </button>
        <button id="btn-nextChapter" className="mediaButton" onClick={() => { setChapter(currentChapter + 1); }} >
          {">>"}
        </button>
        <div id="progressIndicator" className="valueIndicator">
          Progress: {Math.floor((100 * index) / words.length)}%
        </div>
        <div id="speedIndicator" className="valueIndicator">
          Speed: {getWPM()} WPM
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
