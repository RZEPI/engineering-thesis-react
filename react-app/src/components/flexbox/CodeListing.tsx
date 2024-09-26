import { flexboxStyles } from "../../store/flexbox";
import { useAppSelector } from "../../store/hooks";

import styles from "../../styles/flexbox/CodeListing.module.css";

import clipboardSign from "../../assets/clipboard-outline-svgrepo-com.svg";

export default function CodeListing() {
  const flexClasses = useAppSelector(flexboxStyles);

  const parsedEntries: { propertyKey: string; propertyValue: string }[] = [];

  for (const [propertyKey, propertyValue] of Object.entries(flexClasses)) {
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

  function copyToClipboard() {
    let dataToClipboard: string;
    dataToClipboard = "{\n";
    for (const entry of parsedEntries) {
      dataToClipboard += `\t${entry.propertyKey}: ${entry.propertyValue};\n`;
    }
    dataToClipboard += "}";

    navigator.clipboard.writeText(dataToClipboard);
  }

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
        {parsedEntries.map((entry) => (
          <li key={entry.propertyKey}>
            <span className={styles.property}>
              &emsp;&emsp;{entry.propertyKey}:
            </span>
            <span className={styles.value}>
              &nbsp;&nbsp;{entry.propertyValue}
            </span>
            ;
          </li>
        ))}
        <li>{"}"}</li>
      </ul>
    </div>
  );
}
