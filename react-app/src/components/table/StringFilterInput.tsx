import { StringFilterInputProps } from "../../models/table/StringFilterInputProps";

import styles from "../../styles/table/StringFilterInput.module.css";

export default function StringFilterInput({
  className,
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
        id={className}
        className={className}
        checked={filterValue.isChecked}
        value={filterValue.value}
        onChange={handleNameCheckboxChange}
      />
      <label htmlFor={className}>{filterValue.value}</label>
    </li>
  );
}
