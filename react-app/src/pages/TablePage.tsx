import { useEffect, useState } from "react";
import { NumberTable } from "../static/RandomDataTables";
import { NamesTable } from "../static/RandomDataTables";
import TableRow from "../components/UI/TableRow";
import styles from "../styles/TablePage.module.css";
import { TableRowData } from "../models/PerfTestArrayRow";

let key: number = 0;

export default function TablePage() {
  const [TableContent, setContent] = useState<TableRowData[]>([]);

  const TableList = TableContent.map((tuple) => (
    <TableRow
      className={styles["table-row"]}
      t={tuple}
      key={tuple.id}
    ></TableRow>
  ));

  function addNRecords(n: number) {
    let NameIndex: number;
    let LevelIndex: number;

    const TmpArray: TableRowData[] = [];

    for (let i = 0; i < n; i++) {
      NameIndex = Math.floor(Math.random() * NamesTable.length);
      LevelIndex = Math.floor(Math.random() * NumberTable.length);
      TmpArray.unshift({
        id: key++,
        name: NamesTable[NameIndex],
        level: NumberTable[LevelIndex],
      });
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
      TableContent[i].name = "Changed Name " + i;
    }
    setContent([...TableContent]);
  }

  function replaceAllRows() {
    for (let i = 0; i < TableContent.length; i++) {
      TableContent[i] = {
        id: i,
        name: "Replaced " + i,
        level: 1,
      };
    }
    setContent([...TableContent]);
  }

  function swapRows() {
    const Index1 = Math.floor(Math.random() * TableContent.length);
    const Index2 = Math.floor(Math.random() * TableContent.length);

    const tmpRow: TableRowData = TableContent[Index1];
    TableContent[Index1] = TableContent[Index2];
    TableContent[Index2] = tmpRow;

    setContent([...TableContent]);
  }

  function clearRows() {
    TableContent.forEach((element) => {
      element.id = 0;
      element.name = "";
      element.level = 0;
    });

    setContent([...TableContent]);
  }

  function generateArray() {
    const generatedArray: TableRowData[] = [];

    for (let i = 0; i < 5; i++) {
      const NameIndex: number = Math.floor(Math.random() * NamesTable.length);
      const LevelIndex: number = Math.floor(Math.random() * NumberTable.length);
      generatedArray.unshift({
        id: key++,
        name: NamesTable[NameIndex],
        level: NumberTable[LevelIndex],
      });
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
