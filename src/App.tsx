import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import words from './board.json';

const coordinates = [
  [-5, 4],
  [-4, 4],
  [-4, 3],
  [-5, 3],
  [-5, 2],
  [-3, 2],
  [-3, 4],
  [-2, 4],
  [-2, 1],
  [-5, 1],
  [-5, 0],
  [-1, 0],
  [-1, 4],
  [0, 4],
  [0, 0],
  [1, 0],
  [1, 4],
  [2, 4],
  [2, 0],
];

const validateSelectedWord = (n1: number, n2: number) =>
  n1 < 0 || n2 < 0 || n1 > 45 || n2 > 45;

const getSelectedWord = (n1: number, n2: number) => {
  n1--;
  n2--;
  return validateSelectedWord(n1, n2) ? 'Input the coordinates' : words[n1][n2];
};

const createWord = (y: number, x: number) => {
  x--;
  y--;
  if (validateSelectedWord(x, y)) return 'Input the coordinates';

  let word = '';
  console.log(3);
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
      <p>Selected word: {getSelectedWord(y, x)}</p>
      <p>Generated word: {createWord(y, x)}</p>
    </div>
  );
}

export default App;
