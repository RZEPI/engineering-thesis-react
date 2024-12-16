import styles from "../../styles/GridPage.module.css";
import { GridProps } from "../../models/grid/GridProps";

export default function Grid({ css, children }: GridProps) {
  return (
    <div
      className={styles["grid-main"]}
      style={{
        gridAutoFlow: css.gridAutoFlow?.toString(),
        gridTemplateColumns:
          "repeat(auto-fill," + css.gridTemplateColumns?.toString() + "px)",
        gridAutoRows: css.gridAutoRows?.toString() + "px",
        gap: css.gap?.toString() + "px",
      }}
    >
      {children}
    </div>
  );
}
