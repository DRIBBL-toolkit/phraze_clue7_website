import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import words from './board.json';

const coordinates = [
  [-5, -4],
  [-4, -4],
  [-4, -3],
  [-5, -3],
  [-5, -2],
  [-3, -2],
  [-3, -4],
  [-2, -4],
  [-2, -1],
  [-5, -1],
  [-5, 0],
  [-1, 0],
  [-1, -4],
  [0, -4],
  [0, 0],
  [1, 0],
  [1, -4],
  [2, -4],
  [2, 0],
];

const validateSelectedWord = (x: number, y: number) =>
  x < 0 || y < 0 || !x || !y || x > 45 || y > 45;

const getSelectedWord = (x: number, y: number) => {
  x--;
  y--;
  return validateSelectedWord(x, y) ? 'Input the coordinates' : words[x][y];
};

const createWord = (x: number, y: number) => {
  x--;
  y--;
  if (validateSelectedWord(x, y)) return 'Input the coordinates';

  let word = '';
  for (let [addX, addY] of coordinates) {
    if (validateSelectedWord(x + addX, y + addY))
      return 'Input the coordinates';
    word += words[x + addX][y + addY][0];
  }
  return word;
};

function App() {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  return (
    <div className="App">
      <input
        value={x}
        onChange={(e) => {
          const value = Number(e.target.value);
          setX(value);
        }}
      />
      <input
        value={y}
        onChange={(e) => {
          const value = Number(e.target.value);
          setY(value);
        }}
      />
      <p>Selected word: {getSelectedWord(x, y)}</p>
      <p>Generated word: {createWord(x, y)}</p>
    </div>
  );
}

export default App;
