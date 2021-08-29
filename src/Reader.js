import React, { useState, useEffect } from 'react';
import { book } from './Book.js';
import moment from 'moment';
import './App.css';

const chapter = 52;
const speed = 200;

function Reader() {
  const [currentChapter, setCurrentChapter] = useState(chapter);
  let words = book.chapter[currentChapter - 1].content.split(/\s/);
  const [time, setTime] = useState(moment());
  const [initialTime, setInitialTime] = useState(moment());
  let content = (
      <div className="columns">
        <button className="button" onClick={() => { setCurrentChapter(currentChapter - 1); setInitialTime(moment()) }}>{'<'}</button>
        <div class="panel panel-default">
          <div class="panel-heading">
            { book.chapter[currentChapter - 1].title }
          </div>
          <div class="panel-body">
            <h4>
              { words.length > Math.floor((time - initialTime) / speed)
              ? words[Math.floor((time - initialTime) / speed)] 
              : <div>End of Chapter</div>}
            </h4>
          </div>
        </div>
        <button className="button" onClick={() => { setCurrentChapter(currentChapter + 1); setInitialTime(moment()) }}>{'>'}</button>
      </div>
  );
  useEffect(() => {
      const interval = setInterval(() => setTime(moment()), 5);
  }, []);

  return content;
}

export default Reader;

