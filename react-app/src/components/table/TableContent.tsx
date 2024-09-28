import { TableContentProps } from "../../models/table/TableContentProps";
import TableRow from "./TableRow";

import styles from "../../styles/table/TableContent.module.css";

export default function TableContent({ tableContent }: TableContentProps) {
    const tableList = tableContent.map((row) => (
        <TableRow
          rowData={row}
          key={row.id}
        ></TableRow>
      ));

    return (
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
    )
}