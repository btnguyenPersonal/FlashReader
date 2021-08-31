import React, { useState, useEffect } from 'react';
import { book } from './Book.js';
import moment from 'moment';
import './App.css';

let chapter = 70;
let speed = 200;
let index = 0;
let counter = 0;

function incrementIndex() {
  index++;
  return true;
}

function Reader() {

  function setChapter(c) {
    index = 0;
    setCurrentChapter(c);
    setLastTime(moment());
  }
  const [currentChapter, setCurrentChapter] = useState(chapter);
  let words = book.chapter[currentChapter - 1].content.split(/\s/);
  const [time, setTime] = useState(moment());
  const [isPaused, setIsPaused] = useState(false);
  const [lastTime, setLastTime] = useState(moment());
  let content = (
      <div className="columns">
        <button className="button" onClick={() => { setChapter(currentChapter - 1) }}>{'<'}</button>
        <div class="panel panel-default">
          <div class="panel-heading">
            { book.chapter[currentChapter - 1].title }
          </div>
          <div class="panel-body">
            <h2>
              { 
                1 < Math.floor((time - lastTime) / speed) && !isPaused
                ? index <= words.length + 1 ? incrementIndex() && words[index] && setLastTime(moment()) : setChapter(currentChapter + 1)
                : words[index]
              }
            </h2>
            <button className="mediaButton" onClick={() => { speed *= 1.1; counter-- }}>slower</button>
            <button className="mediaButton" onClick={() => { isPaused ? setIsPaused(false) : setIsPaused(true) }}>{ isPaused ? '>' : '||' }</button>
            <button className="mediaButton" onClick={() => { speed /= 1.1; counter++ }}>faster</button>
            <div className="speedIndicator">{counter}</div>
            <div className="speedIndicator">{Math.floor(100 * index/words.length) + '%'}</div>
          </div>
        </div>
        <button className="button" onClick={() => { setChapter(currentChapter + 1) }}>{'>'}</button>
      </div>
  );
  useEffect(() => {
      const interval = setInterval(() => setTime(moment()), 1);
  }, []);

  return content;
}

export default Reader;

