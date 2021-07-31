import React from 'react';
import { book } from './Book_1.js';
import moment from 'moment';

const words = book.content.split(' ');

function getNextWord() {
  return moment().toString();;
}

function Reader() {
  return (
    <>
      <p>
        { book.title }
      </p>
      <p>
        { getNextWord() }
      </p>
    </>
  );
}

export default Reader;
