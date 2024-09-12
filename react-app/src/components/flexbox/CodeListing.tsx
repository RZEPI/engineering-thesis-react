import { flexboxStyles } from "../../store/flexbox";
import { useAppSelector } from "../../store/hooks";

import styles from "../../styles/flexbox/CodeListing.module.css";

import clipboardSign from "../../assets/clipboard-outline-svgrepo-com.svg";

export default function CodeListing() {
  const flexClasses = useAppSelector(flexboxStyles);
  const propertyEntries = Object.entries(flexClasses);

  function copyToClipboard() {
    let dataToClipboard: string;
    dataToClipboard = "{\n";
    for (const [propertyKey, propertyValue] of propertyEntries) {
      dataToClipboard += `\t${propertyKey}: ${propertyValue};\n`;
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
        {propertyEntries.map(([propertyKey, propertyValue]) => (
          <li key={propertyKey}>
            <span className={styles.property}>&emsp;&emsp;{propertyKey}:</span>
            <span className={styles.value}>&nbsp;&nbsp;{propertyValue}</span>;
          </li>
        ))}
        <li>{"}"}</li>
      </ul>
    </div>
  );
}
