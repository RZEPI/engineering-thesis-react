import { useEffect, useState } from "react";
import { numberTable } from "../static/RandomDataTables";
import { namesTable } from "../static/RandomDataTables";
import TableRow from "../components/UI/TableRow";
import styles from "../styles/TablePage.module.css";
import { TableRowData } from "../models/PerfTestArrayRow";

const RECORDS_TO_CREATE: number = 3000;
const RECORDS_TO_DELETE: number = 1000;
const NTH_TO_DELETE: number = 2;
const NTH_TO_UPDATE: number = 2;

let key: number = 0;

export default function TablePage() {
  const [tableContent, setContent] = useState<TableRowData[]>([]);

  const rowCount: number = tableContent.length;

  const tableList = tableContent.map((tuple) => (
    <TableRow
      className={styles["table-row"]}
      t={tuple}
      key={tuple.id}
    ></TableRow>
  ));

  function addNRecords(n: number) {
    let nameIndex: number;
    let levelIndex: number;

    const tmpArray: TableRowData[] = [];

    for (let i = 0; i < n; i++) {
      nameIndex = Math.floor(Math.random() * namesTable.length);
      levelIndex = Math.floor(Math.random() * numberTable.length);

      tmpArray.unshift({
        id: key++,
        name: namesTable[nameIndex],
        level: numberTable[levelIndex],
      });
    }

    setContent([...tmpArray, ...tableContent]);
  }

  function deleteNRecords(n: number) {
    setContent(tableContent.slice(n));
  }

  function deleteEveryNthRecord(n: number) {
    const tmpArray: TableRowData[] = [...tableContent];

    for (let i = 0; i < tmpArray.length; i += n) {
      tmpArray.splice(i--, 1);
    }
    setContent([...tmpArray]);
  }

  function updateNthRow(n: number) {
    const tmpArray: TableRowData[] = [...tableContent];

    for (let i = 0; i < tmpArray.length; i += n) {
      tmpArray[i] = {
        ...tableContent[i],
        name: "Changed Name " + i,
      };
    }

    setContent([...tmpArray]);
  }

  function replaceAllRows() {
    const tmpArray: TableRowData[] = [];

    for (let i = 0; i < tableContent.length; i++) {
      tmpArray.push({
        id: key++,
        name: "Replaced " + i,
        level: 1,
      });
    }

    setContent([...tmpArray]);
  }

  function swapRows() {
    const Index1 = Math.floor(Math.random() * tableContent.length);
    const Index2 = Math.floor(Math.random() * tableContent.length);

    const tmpRow: TableRowData = tableContent[Index1];
    tableContent[Index1] = tableContent[Index2];
    tableContent[Index2] = tmpRow;

    setContent([...tableContent]);
  }

  function clearRows() {
    const tmpArray: TableRowData[] = [];

    for (let i = 0; i < tableContent.length; i++) {
      tmpArray.push({
        id: tableContent[i].id,
        name: "",
        level: 0,
      });
    }

    setContent([...tmpArray]);
  }

  function generateArray() {
    const generatedArray: TableRowData[] = [];

    for (let i = 0; i < 5; i++) {
      const nameIndex: number = Math.floor(Math.random() * namesTable.length);
      const levelIndex: number = Math.floor(Math.random() * numberTable.length);

      generatedArray.unshift({
        id: key++,
        name: namesTable[nameIndex],
        level: numberTable[levelIndex],
      });
    }

    setContent([...generatedArray]);
  }

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["page-content"]}>
        <div className={styles["v-btn-cont"]}>
          <button onClick={() => addNRecords(RECORDS_TO_CREATE)}>
            Add {RECORDS_TO_CREATE}
          </button>
          <button onClick={() => deleteNRecords(RECORDS_TO_DELETE)}>
            Delete {RECORDS_TO_DELETE}
          </button>
          <button
            onClick={() => {
              deleteEveryNthRecord(NTH_TO_DELETE);
            }}
          >
            Delete {NTH_TO_DELETE}th
          </button>
          <button onClick={() => updateNthRow(NTH_TO_UPDATE)}>
            Update {NTH_TO_UPDATE}th
          </button>
          <button onClick={replaceAllRows}>Replace all</button>
          <button onClick={swapRows}>Swap</button>
          <button onClick={clearRows}>Clear all</button>
          <span>rows: {rowCount}</span>
        </div>

        <div className={styles["table-container"]}>
          <div className={styles["table"]}>
            <div className={styles["table-header"]}>
              <div>Id</div>
              <div>Name</div>
              <div>Level</div>
            </div>
            {tableList}
          </div>
        </div>
      </div>
    </div>
  );
}
