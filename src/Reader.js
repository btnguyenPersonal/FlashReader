import React, { useState, useEffect } from 'react';
import { book } from './Book.js';
import moment from 'moment';

const chapter = 52;
const speed = 200;

function Reader() {
  const [currentChapter, setCurrentChapter] = useState(chapter);
  let words = book.chapter[currentChapter - 1].content.split(/\s/);
  const [time, setTime] = useState(moment());
  const [initialTime, setInitialTime] = useState(moment());
  let content = (
    <>
      <h5>
        { book.chapter[currentChapter - 1].title }
      </h5>
      <p>
        { words.length > Math.floor((time - initialTime) / speed)
        ? words[Math.floor((time - initialTime) / speed)] 
        : <button onClick={() => {setCurrentChapter(currentChapter + 1);setInitialTime(moment())}}>Next Chapter</button>}
      </p>
    </>
  );
  useEffect(() => {
      const interval = setInterval(() => setTime(moment()), 5);
  }, []);

  return content;
}

export default Reader;

