import react from 'react';
import words from './board.json';

const Table = () => {
  const head = [<td>{''}</td>];
  const rows = [];

  for (let i = 1; i <= 45; i++) {
    rows.push(
      <tr>
        <th>{i}</th>
        {words[i - 1].map((word) => (
          <td>{word}</td>
        ))}
      </tr>
    );
    head.push(<th>{i}</th>);
  }
  return (
    <table className="table-fixed">
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default Table;
