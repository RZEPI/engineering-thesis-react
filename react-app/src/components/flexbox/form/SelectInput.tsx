import { ChangeEvent } from "react";
import { SelectInputProps } from "../../../models/flexbox-generator/SelectInputProps";

import styles from "../../../styles/flexbox/SelectInput.module.css";

export default function SelectInput({
  selectHeader,
  optionList,
  selectionFunc,
}: SelectInputProps) {
  const selectName = selectHeader.toLowerCase().replace(" ", "-");

  function handleSelection(event: ChangeEvent<HTMLSelectElement>) {
    const chosenOption = event.target.value;
    selectionFunc(chosenOption);
  }

  return (
    <div className={styles["select-container"]}>
      <label className={styles.label} htmlFor={selectName}>
        {selectHeader}
      </label>
      <select
        className={styles.select}
        name={selectName}
        id={selectName}
        onChange={(event) => handleSelection(event)}
      >
        {optionList.map((optionItem) => {
          return (
            <option value={optionItem} key={optionItem}>
              {optionItem}
            </option>
          );
        })}
      </select>
    </div>
  );
}
