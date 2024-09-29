import { CSSProperties } from "react";
import styles from "../styles/GridPage.module.css";

export function CodeListing({ cssProps }: { cssProps: CSSProperties }) {
  return (
    <div className={styles["code-listing"]}>
      &#123;
      <br />
      <span style={{ paddingLeft: "2em" }}>
        grid-auto-flow : {cssProps.gridAutoFlow}
      </span>
      <br />
      {/* <button onClick={() => {
              }}>Console log ref style</button> */}
      &#125;
    </div>
  );
}
