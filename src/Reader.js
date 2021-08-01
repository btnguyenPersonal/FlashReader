import React, { useState, useEffect } from 'react';
import { book } from './Book_1.js';
import moment from 'moment';

const words = book.content.split(' ');

function Reader() {
  const [time, setTime] = useState(moment());
  const [initialTime, setInitialTime] = useState(moment());
  let content = (
    <>
      <p>
        { words[Math.floor((time - initialTime) / 150)] }
      </p>
    </>
  );
  useEffect(() => {
      const interval = setInterval(() => setTime(moment()), 5);
  }, []);

  return content;
}

export default Reader;

