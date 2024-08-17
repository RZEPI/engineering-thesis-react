import styles from "../../styles/TablePage.module.css";
import { ArrayRow } from "../../models/PerfTestArrayRow.ts"

export default function TableRow({t, className} : {t : ArrayRow, className : string}) {

  return (
    <div className={styles["table-row"]}>
      <div className={styles["table-cell"]}>{t[0]}</div>
      <div className={styles["table-cell"]}>{t[1]}</div>
      <div className={styles["table-cell"]}>{t[2]}</div>
    </div>
  )
}
