import { useRef, useState, useEffect } from "react";

import TableActions from "../components/table/TableActions";
import TableContent from "../components/table/TableContent";
import TableFilterModal from "../components/table/TableFilterModal";

import { TableRowData } from "../models/table/TableRowData";
import { DialogHandle } from "../models/DialogHandle";
import {
  TableFilter,
  IntFilter,
  StringFilter,
} from "../models/table/TableFilter";

import {
  numberTable,
  namesTable,
  makeDefaultFilter,
  tableFields,
} from "../static/RandomDataTables";
import styles from "../styles/table/TablePage.module.css";
import { ActionFunctions } from "../models/table/TableActionsProps";


let key: number = 0;

export default function TablePage() {
  const [tableContent, setContent] = useState<TableRowData[]>([]);
  const [tableFilter, setFilter] = useState<TableFilter>({
    ...makeDefaultFilter(),
  });

  const ref = useRef<DialogHandle>(null);

  function openFilterModal() {
    ref.current?.open();
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
        name: "Changed Name " + tableContent[i].name,
      };
    }

    setContent(tmpArray);
  }

  function replaceAllRows() {
    const tmpArray: TableRowData[] = [];

    for (let i = 0; i < tableContent.length; i++) {
      tmpArray.push({
        id: key++,
        name: "Replaced " + tableContent[i].name,
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

  const actionFunctions: ActionFunctions = {
    addNRecords,
    deleteNRecords,
    deleteEveryNthRecord,
    updateNthRow,
    replaceAllRows,
    swapRows,
    clearRows,
  };

  function checkIfValueInRangeClosed(
    value: number,
    filter: IntFilter,
  ): boolean {
    if (filter.min !== undefined && filter.min > value) return false;
    if (filter.max !== undefined && filter.max < value) return false;

    return true;
  }

  function checkIfValueInRangeOpen(value: number, filter: IntFilter): boolean {
    if (filter.min !== undefined && filter.min >= value) return false;
    if (filter.max !== undefined && filter.max <= value) return false;

    return true;
  }

  function checkIfValueIsInFilterRange(
    value: number,
    filter: IntFilter,
  ): boolean {
    if (filter.isOpen) {
      return checkIfValueInRangeOpen(value, filter);
    } else {
      return checkIfValueInRangeClosed(value, filter);
    }
  }

  function checkIfNameIsInFilter(
    givenName: string,
    filter: StringFilter[],
  ): boolean {
    return (
      filter.find((name) => (givenName.includes(name.value) && name.isChecked) || givenName === "") !==
      undefined
    );
  }

  const filteredTableContent = tableContent.filter((row) => {
    if (!checkIfValueIsInFilterRange(row.id, tableFilter.id)) return false;

    if (!checkIfValueIsInFilterRange(row.level, tableFilter.level))
      return false;

    if (!checkIfNameIsInFilter(row.name, tableFilter.name)) return false;

    return true;
  });

  return (
    <>
      <TableFilterModal ref={ref} filter={tableFilter} setFilter={setFilter} />
      <div className={styles["page-wrapper"]}>
        <div className={styles["page-content"]}>
          <TableActions
            tableContent={filteredTableContent}
            actionFunctions={actionFunctions}
          />
          <TableContent
            tableContent={filteredTableContent}
            tableFields={tableFields}
            openFilterDialog={openFilterModal}
          />
        </div>
      </div>
    </>
  );
}
