import { NumericFilterInputProps } from "../../models/table/NumericFilterInputProps";

import styles from "../../styles/table/NumericFilterInput.module.css";

export default function NumericFilterInput({className, value, handleChange}: NumericFilterInputProps) {
    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    }
    const label = `${className.charAt(0).toUpperCase()}${className.substring(1)}:`;

  return (
    <li className={styles["numeric-input"]}>
      <label htmlFor={className}>{label}</label>
      <input
        type="number"
        className={className}
        id={className}
        value={value}
        onChange={handleNumberInputChange}
      />
    </li>
  );
}
