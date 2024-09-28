import { useEffect } from "react";
import { numberTable } from "../../static/RandomDataTables";
import { namesTable } from "../../static/RandomDataTables";
import { TableRowData } from "../../models/TableRowData";
import { TableActionsProps } from "../../models/TableActionsProps";

import styles from "../../styles/table/TableActions.module.css";

const RECORDS_TO_CREATE: number = 30_000;
const RECORDS_TO_DELETE: number = 3_000;
const NTH_TO_DELETE: number = 2;
const NTH_TO_UPDATE: number = 2;

let key: number = 0;

export default function TableActions({
  tableContent,
  setContent,
}: TableActionsProps) {
  const rowCount: number = tableContent.length;

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
    setContent(tmpArray);
  }

  function updateNthRow(n: number) {
    const tmpArray: TableRowData[] = [...tableContent];

    for (let i = 0; i < tmpArray.length; i += n) {
      tmpArray[i] = {
        ...tableContent[i],
        name: "Changed Name " + i,
      };
    }

    setContent(tmpArray);
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

    setContent(tmpArray);
  }

  function swapRows() {
    const tmpArray: TableRowData[] = [...tableContent];

    const index1 = Math.floor(Math.random() * tableContent.length);
    const index2 = Math.floor(Math.random() * tableContent.length);

    tmpArray[index1] = tableContent[index2];
    tmpArray[index2] = tableContent[index1];

    setContent(tmpArray);
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

    setContent(tmpArray);
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

    setContent(generatedArray);
  }

  useEffect(() => {
    generateArray();
  }, []);

  return (
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
  );
}
