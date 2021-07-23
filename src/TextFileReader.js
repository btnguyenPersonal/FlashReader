import React from 'react';
import { writeFile } from 'fs';

class TextFileReader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.readTextFile(this.props.txt);
  }

  readTextFile = file => {
    let fileText;
    var fs = require('fs');
    fs.writeFile("test.txt", fileText, function(err) {
        if (err) {
        console.log(err);
        }
    });
    console.log(fileText);
  };

  render() {
    return (
        <div>
        </div>
        );
  }
}

export default TextFileReader;
