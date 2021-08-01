import React, { useState, useEffect } from 'react';
import { book } from './Book.js';
import moment from 'moment';

const chapter = 8;
const speed = 150;

const words = book.chapter[chapter - 1].content.split(/\s/);

function Reader() {
  const [time, setTime] = useState(moment());
  const [initialTime, setInitialTime] = useState(moment());
  let content = (
    <>
      <h5>
        { book.chapter[chapter - 1].title }
      </h5>
      <p>
        { words[Math.floor((time - initialTime) / speed)] }
      </p>
    </>
  );
  useEffect(() => {
      const interval = setInterval(() => setTime(moment()), 5);
  }, []);

  return content;
}

export default Reader;

