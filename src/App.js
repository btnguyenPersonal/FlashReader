import logo from './logo.svg';
import './App.css';
import { book } from './Book_1.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { book.title }
        </p>
      </header>
    </div>
  );
}

export default App;
