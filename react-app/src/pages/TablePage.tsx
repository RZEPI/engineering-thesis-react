import { useEffect, useState } from "react";
import { NumberTable } from "../static/RandomDataTables";
import { NamesTable } from "../static/RandomDataTables";
import styles from "../styles/TablePage.module.css";

let key: number = 0;

export default function TablePage() {
  const [TableContent, setContent] = useState<[number, string, number][]>([]);

  const TableList = TableContent.map((tuple) => (
    <tr key={tuple[0]}>
      <td>{tuple[0]}</td>
      <td>{tuple[1]}</td>
      <td>{tuple[2]}</td>
    </tr>
  ));

  function addRecord() {
    const NameIndex: number = Math.floor(Math.random() * NamesTable.length);
    const LevelIndex: number = Math.floor(Math.random() * NumberTable.length);
    const newTuple: [number, string, number] = [
      key++,
      NamesTable[NameIndex],
      NumberTable[LevelIndex],
    ];
    setContent([newTuple, ...TableContent]);
  }

  function deleteRecord() {
    TableContent.splice(0, 1);
    setContent([...TableContent]);
  }

  function deleteEveryNthRecord(n: number) {
    for (let i = 0; i < TableContent.length; i += n) {
      TableContent.splice(i--, 1);
    }
    setContent([...TableContent]);
  }

  function generateArray() {
    const generatedArray: [number, string, number][] = [];

    for (let i = 0; i < 5; i++) {
      const NameIndex: number = Math.floor(Math.random() * NamesTable.length);
      const LevelIndex: number = Math.floor(Math.random() * NumberTable.length);
      generatedArray.unshift([
        key++,
        NamesTable[NameIndex],
        NumberTable[LevelIndex],
      ]);
    }

    setContent([...generatedArray, ...TableContent]);
  }

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className={styles["table-page"]}>
      <span className={styles["vertical-buttons"]}>
        <button onClick={addRecord}>Add</button>
        <button onClick={deleteRecord}>Delete</button>
        <button
          onClick={() => {
            deleteEveryNthRecord(2);
          }}
        >
          Delete every nth
        </button>
      </span>
      <table className={styles["table"]}>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Level</th>
        </thead>
        <tbody>{TableList}</tbody>
      </table>
    </div>
  );
}
