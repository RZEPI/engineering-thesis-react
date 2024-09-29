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
      style={{ gridAutoFlow: cssProps.gridAutoFlow }}
    >
      {children}
    </div>
  );
}
