import { LayoutProps } from "../../models/LayoutProps";
import { PropsWithChildren } from "react";

import styles from "../../styles/Layout.module.css";

export default function Layout({
  title,
  children,
}: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <h1 className={styles.header}>{title}</h1>
      <main className={styles.main}>{children}</main>
    </>
  );
}
