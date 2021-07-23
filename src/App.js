import React, { Component } from 'react';
import TextFileReader from './TextFileReader.js';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    return (<div>
      <TextFileReader txt={'~/Downloads/Book 1 - Patriarch Reliance.txt'} />
    </div>
    )
  }
}

export default App;
