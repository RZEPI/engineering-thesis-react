import { useEffect, useState } from "react";
import { NumberTable } from "../static/RandomDataTables";
import { NamesTable } from "../static/RandomDataTables";
import TableRow from "../components/UI/TableRow";
import styles from "../styles/TablePage.module.css";
import { ArrayRow } from "../models/PerfTestArrayRow";

let key: number = 0;

export default function TablePage() {
  const [TableContent, setContent] = useState<ArrayRow[]>([]);

  const TableList = TableContent.map((tuple) => (
    <TableRow
      className={styles["table-row"]}
      t={tuple}
      key={tuple[0]}
      >
    </TableRow>
  ));

  function addRecord() {
    const NameIndex: number = Math.floor(Math.random() * NamesTable.length);
    const LevelIndex: number = Math.floor(Math.random() * NumberTable.length);
    const newTuple: ArrayRow = [
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
    const generatedArray: ArrayRow[] = [];

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
    <div className={styles["page-wrapper"]}>
      <div className={styles["page-content"]}>
        <div className={styles["v-btn-cont"]}>
          <button onClick={addRecord}>Add</button>
          <button onClick={deleteRecord}>Delete</button>
          <button
            onClick={() => {
              deleteEveryNthRecord(2);
            }}
          >
            Delete every nth
          </button>
        </div>

        <div className={styles["table-container"]}>
          <div className={styles["table"]}>
            <div className={styles["table-header"]}>
              <div>Id</div>
              <div>Name</div>
              <div>Level</div>
            </div>
            {TableList}
          </div>
        </div>
      </div>
    </div>
  );
}
