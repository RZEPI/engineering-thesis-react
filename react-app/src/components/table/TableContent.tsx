import { TableContentProps } from "../../models/table/TableContentProps";
import TableRow from "./TableRow";

import filter from "../../assets/filter.png";

import styles from "../../styles/table/TableContent.module.css";

export default function TableContent({
  tableContent,
  tableFields,
  openFilterDialog,
}: TableContentProps) {
  const tableList = tableContent.map((row) => (
    <TableRow rowData={row} key={row.id}></TableRow>
  ));

  function handleFilterClick() {
    openFilterDialog();
  }

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table"]}>
        <div className={styles["table-header"]}>
          {tableFields.map((field) => (
            <div key={field}>{field}</div>
          ))}
          <img src={filter} alt="filter" onClick={handleFilterClick} />
        </div>
        {tableList}
      </div>
    </div>
  );
}
