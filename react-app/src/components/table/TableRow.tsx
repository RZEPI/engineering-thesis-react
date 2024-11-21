import { useState } from "react";
import { TableRowProps } from "../../models/table/TableRowProps.ts";

import styles from "../../styles/table/TableRow.module.css";

export default function TableRow({ rowData }: TableRowProps) {
  const [focus, setFocus] = useState<boolean>(false);

  function onClick() {
    setFocus((focus) => !focus);
  }

  const classNames =
    styles["table-row"] + (focus ? " " + styles["active"] : "");

  return (
    <div className={classNames} onClick={onClick}>
      <div className={styles["table-cell"]}>{rowData.id}</div>
      <div className={styles["table-cell"]}>{rowData.name}</div>
      <div className={styles["table-cell"]}>{rowData.level}</div>
    </div>
  );
}
