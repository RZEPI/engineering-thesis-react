import { CSSProperties } from "react";
import styles from "../styles/GridPage.module.css";
import { parseCssEntries } from "../util/util";

export function CodeListing({ cssProps }: { cssProps: CSSProperties }) {

  function generateEntries() {
    return parsedEntries.map((e, index) => (
      <div key={index}>
        <span style={{ paddingLeft: "2em" }}>
          {e.propertyKey}: {e.propertyValue}
        </span>
        {index < parsedEntries.length - 1 && <br />}
      </div>
    ));
  }

  const parsedEntries: { propertyKey: string; propertyValue: string }[] =
    parseCssEntries(cssProps);

  return (
    <div className={styles["code-listing"]}>
      &#123;
      {generateEntries()}
      &#125;
    </div>
  );
}
