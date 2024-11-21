import { TableActionsProps } from "../../models/table/TableActionsProps";

import styles from "../../styles/table/TableActions.module.css";

const RECORDS_TO_CREATE: number = 30_000;
const RECORDS_TO_DELETE: number = 3_000;
const NTH_TO_DELETE: number = 2;
const NTH_TO_UPDATE: number = 2;

export default function TableActions({
  tableContent,
  actionFunctions,
}: TableActionsProps) {
  function handleAddRecordsClick() {
    actionFunctions.addNRecords(RECORDS_TO_CREATE);
  }

  function handleDeleteRecordsClick() {
    actionFunctions.deleteNRecords(RECORDS_TO_DELETE);
  }

  function handleDeleteEveryNthRecordClick() {
    actionFunctions.deleteEveryNthRecord(NTH_TO_DELETE);
  }

  function handleUpdateNthRowClick() {
    actionFunctions.updateNthRow(NTH_TO_UPDATE);
  }

  function handleReplaceAllRowsClick() {
    actionFunctions.replaceAllRows();
  }

  function handleSwapRowsClick() {
    actionFunctions.swapRows();
  }

  function handleClearRowsClick() {
    actionFunctions.clearRows();
  }

  const rowCount: number = tableContent.length;

  return (
    <div className={styles["v-btn-cont"]}>
      <button onClick={handleAddRecordsClick}>Add {RECORDS_TO_CREATE}</button>
      <button onClick={handleDeleteRecordsClick}>
        Delete {RECORDS_TO_DELETE}
      </button>
      <button onClick={handleDeleteEveryNthRecordClick}>
        Delete {NTH_TO_DELETE}th
      </button>
      <button onClick={handleUpdateNthRowClick}>
        Update {NTH_TO_UPDATE}th
      </button>
      <button onClick={handleReplaceAllRowsClick}>Replace all</button>
      <button onClick={handleSwapRowsClick}>Swap</button>
      <button onClick={handleClearRowsClick}>Clear all</button>
      <span>rows: {rowCount}</span>
    </div>
  );
}
