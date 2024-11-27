import styles from "../styles/TablePage.module.css";
import { useState } from "react";
import { TableRowData } from "../models/table/TableRowData";

export default function TableRow({
  t,
}: {
  t: TableRowData;
  className: string;
}) {
  const [focus, setFocus] = useState<boolean>(false);

  function onClick() {
    setFocus((focus) => !focus);
  }

  const classNames =
    styles["table-row"] + (focus ? " " + styles["active"] : "");

  return (
    <div className={classNames} onClick={onClick}>
      <div className={styles["table-cell"]}>{t.id}</div>
      <div className={styles["table-cell"]}>{t.name}</div>
      <div className={styles["table-cell"]}>{t.level}</div>
    </div>
  );
}
