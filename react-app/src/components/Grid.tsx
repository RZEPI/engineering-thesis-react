import { CSSProperties, ReactNode } from "react";
import styles from "../styles/GridPage.module.css";

export default function Grid({
  cssProps,
  children,
}: {
  cssProps: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={styles["grid-main"]}
      style={{
        gridAutoFlow: cssProps.gridAutoFlow?.toString(),
        gridTemplateColumns:
          "repeat(auto-fill," +
          cssProps.gridTemplateColumns?.toString() +
          "px)",
        gridAutoRows: cssProps.gridAutoRows?.toString() + "px",
        gap: cssProps.gap?.toString() + "px",
      }}
    >
      {children}
    </div>
  );
}
