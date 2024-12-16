import { ReactNode } from "react";
import styles from "../../styles/GridPage.module.css";

export default function GridButtonWindow({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <div className={styles["v-btn-window"]}>
        <span className={styles["title"]}>{title}</span>
        <div className={styles["v-btn-cont"]}>{children}</div>
      </div>
    </>
  );
}
