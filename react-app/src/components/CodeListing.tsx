import { CSSProperties } from "react";
import styles from "../styles/GridPage.module.css";

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

const parsedEntries: { propertyKey: string; propertyValue: string }[] = [];

  for (const [propertyKey, propertyValue] of Object.entries(cssProps)) {
    let upperCaseCharIdx = null;
    let idx = 0;
    for (const character of propertyKey) {
      const code = character.charCodeAt(0);
      if (code >= 65 && code <= 90) upperCaseCharIdx = idx;
      idx++;
    }
    let parsedKey;
    if (upperCaseCharIdx)
      parsedKey =
        `${propertyKey.substring(0, upperCaseCharIdx)}-${propertyKey.substring(upperCaseCharIdx)}`.toLowerCase();
    else parsedKey = propertyKey;

    parsedEntries.unshift({ propertyKey: parsedKey, propertyValue });
  }

  return (
    <div className={styles["code-listing"]}>
      &#123;
        {generateEntries()}
      &#125;
    </div>
  );
}
