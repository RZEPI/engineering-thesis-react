import { CSSProperties } from "react";
import { parseCssEntries } from "../util/util";
import clipboardSign from "../assets/clipboard-outline-svgrepo-com.svg";

import styles from "../styles/flexbox/CodeListing.module.css";
export function CodeListing({ cssProps }: { cssProps: CSSProperties }) {
  function generateEntries() {
    return parsedEntries.map((e, index) => (
      <li key={e.propertyKey}>
        <span style={{ paddingLeft: "2em" }}>
          {e.propertyKey}: {e.propertyValue};
        </span>
        {index < parsedEntries.length - 1 && <br />}
      </li>
    ));
  }

  function copyToClipboard() {
    let dataToClipboard: string;
    dataToClipboard = "{\n";
    for (const entry of parsedEntries) {
      dataToClipboard += `\t${entry.propertyKey}: ${entry.propertyValue};\n`;
    }
    dataToClipboard += "}";

    navigator.clipboard.writeText(dataToClipboard);
  }

  const parsedEntries: { propertyKey: string; propertyValue: string }[] =
    parseCssEntries(cssProps);

  return (
    <div className={styles["code-listing__container"]}>
      <header className={styles.header}>
        <span>Code listing</span>
        <div onClick={copyToClipboard}>
          <img src={clipboardSign} alt="Clipboard sign" />
        </div>
      </header>
      <ul className={styles["code-listing"]}>
        <li>{"{"}</li>
        {generateEntries()}
        <li>{"}"}</li>
      </ul>
    </div>
  );
}
