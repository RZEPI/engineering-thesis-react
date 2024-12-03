import { flexboxStyles } from "../../store/flexbox";
import { useAppSelector } from "../../store/hooks";

import styles from "../../styles/flexbox/CodeListing.module.css";

import clipboardSign from "../../assets/clipboard-outline-svgrepo-com.svg";
import { parseCssEntries } from "../../util/util";

export default function CodeListing() {
  const flexClasses = useAppSelector(flexboxStyles);

  const parsedEntries: { propertyKey: string; propertyValue: string }[] =
    parseCssEntries(flexClasses);

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
