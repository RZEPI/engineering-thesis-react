import { StringFilterInputProps } from "../../models/table/StringFilterInputProps";

import styles from "../../styles/table/StringFilterInput.module.css";

export default function StringFilterInput({
  className=undefined,
  filterValue,
  handleChange,
}: StringFilterInputProps) {
  function handleNameCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
  }

  return (
    <li className={styles["string-input"]}>
      <input
        type="checkbox"
        className={className}
        checked={filterValue.isChecked}
        value={filterValue.value}
        onChange={handleNameCheckboxChange}
      />
      <label>{filterValue.value}</label>
    </li>
  );
}
