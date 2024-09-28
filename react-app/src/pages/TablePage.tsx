import { useState } from "react";

import TableActions from "../components/table/TableActions";
import TableContent from "../components/table/TableContent";

import { TableRowData } from "../models/TableRowData";
import styles from "../styles/table/TablePage.module.css";

export default function TablePage() {
  const [tableContent, setContent] = useState<TableRowData[]>([]);

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["page-content"]}>
        <TableActions tableContent={tableContent} setContent={setContent}/>

        <TableContent tableContent={tableContent}/>
      </div>
    </div>
  );
}
