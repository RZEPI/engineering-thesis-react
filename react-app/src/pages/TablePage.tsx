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
    ></TableRow>
  ));

  function addNRecords(n: number) {
    let NameIndex: number;
    let LevelIndex: number;

    const TmpArray: ArrayRow[] = [];

    for (let i = 0; i < n; i++) {
      NameIndex = Math.floor(Math.random() * NamesTable.length);
      LevelIndex = Math.floor(Math.random() * NumberTable.length);
      TmpArray.unshift([key++, NamesTable[NameIndex], NumberTable[LevelIndex]]);
    }

    setContent([...TmpArray, ...TableContent]);
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

  function updateNthRow(n: number) {
    for (let i = 0; i < TableContent.length; i += n) {
      TableContent[i][1] = "Changed Name " + i;
    }
    setContent([...TableContent]);
  }

  function replaceAllRows() {
    for (let i = 0; i < TableContent.length; i++) {
      TableContent[i] = [i, "Replaced " + i, 1];
    }
    setContent([...TableContent]);
  }

  function swapRows() {
    const Index1 = Math.floor(Math.random() * TableContent.length);
    const Index2 = Math.floor(Math.random() * TableContent.length);

    const tmpRow: ArrayRow = TableContent[Index1];
    TableContent[Index1] = TableContent[Index2];
    TableContent[Index2] = tmpRow;

    setContent([...TableContent]);
  }

  function clearRows() {
    TableContent.forEach((element) => {
      element[0] = 0;
      element[1] = "";
      element[2] = 0;
    });

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
          <button onClick={() => addNRecords(5)}>Add</button>
          <button onClick={deleteRecord}>Delete</button>
          <button
            onClick={() => {
              deleteEveryNthRecord(2);
            }}
          >
            Delete Nth{" "}
          </button>
          <button onClick={() => updateNthRow(2)}>Update Nth</button>
          <button onClick={replaceAllRows}>Replace all</button>
          <button onClick={swapRows}>Swap rows</button>
          <button onClick={clearRows}>Clear rows</button>
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
