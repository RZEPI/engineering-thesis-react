import styles from "../styles/GridPage.module.css";
import Grid from "../components/Grid";

export default function GridPage() {
  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["page-content"]}>{<Grid />}</div>
    </div>
  );
}
