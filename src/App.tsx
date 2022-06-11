import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import words from './board.json';
import Table from './Table';

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
  n1 < 0 || n2 < 0 || n1 >= 45 || n2 >= 45;

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
    word += words[y + addY][x + addX][0];
  }
  return word;
};

const bottomLeftWord = (y: number, x: number) => {
  x--;
  y--;
  if (validateSelectedWord(x, y)) return 'Input the coordinates';
  if (validateSelectedWord(x - 5, y + 4)) return 'Input the coordinates';
  return words[y + 4][x - 5];
};

const topRightWord = (y: number, x: number) => {
  x--;
  y--;
  if (validateSelectedWord(x, y)) return 'Input the coordinates';
  if (validateSelectedWord(x + 2, y)) return 'Input the coordinates';
  return words[y][x + 2];
};

const findPos = (word: string) => {
  for (let i = 0; i < 45; i++) {
    for (let j = 0; j < 45; j++) {
      if (words[i][j] == word) return { x: i, y: j };
    }
  }
  return { x: -1, y: -1 };
};
function App() {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  useEffect(() => {
    let doubleWords: string[] = [];
    for (const row of words) {
      doubleWords = [
        ...doubleWords,
        ...row.filter((word) => word.includes('/')),
      ];
    }
    for (const doubleWord of doubleWords) {
      const { x, y } = findPos(doubleWord);
      console.log(
        `${doubleWord}: BL - ${bottomLeftWord(
          x + 1,
          y + 1
        )} -- TR ${topRightWord(x + 1, y + 1)}`
      );
    }
  }, []);

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
      <p>Bottom left word: {bottomLeftWord(y, x)}</p>
      <p>Top right word: {topRightWord(y, x)}</p>
      <Table />
    </div>
  );
}

export default App;
