import { CSSProperties } from "react";
import styles from "../styles/GridPage.module.css";

export function CodeListing({ cssProps }: { cssProps: CSSProperties }) {
  return (
    <div className={styles["code-listing"]}>
      &#123;
      <br />
      <span style={{ paddingLeft: "2em" }}>
        grid-auto-flow: {cssProps.gridAutoFlow};
      </span>
      <br />
      <span style={{ paddingLeft: "2em" }}>
        grid-template-columns: {cssProps.gridTemplateColumns};
      </span>
      <br />
      <span style={{ paddingLeft: "2em" }}>
        grid-auto-rows: {cssProps.gridAutoRows}
        {";"}
      </span>
      <br />
      <span style={{ paddingLeft: "2em" }}>gap: {cssProps.gap};</span>
      <br />
      &#125;
    </div>
  );
}
