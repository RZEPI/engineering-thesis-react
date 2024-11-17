import { NumericFilterInputProps } from "../../models/table/NumericFilterInputProps";

import { useState } from "react";
import styles from "../../styles/table/NumericFilterInput.module.css";

export default function NumericFilterInput({
  className,
  value,
  handleChange,
}: NumericFilterInputProps) {
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value === "") {
        handleChange(e);
        setError(null);
        return;
      }
      const value = parseInt(e.target.value);
      if (isNaN(value)) {
        setError("Invalid input ");
        return;
      }
      setError(null);
      handleChange(e);
    } catch (error) {
      setError("Invalid input");
      return;
    }
  };
  const label = `${className.charAt(0).toUpperCase()}${className.substring(1)}:`;
  const [error, setError] = useState<string | null>(null);

  let classes = className;
  if (error) {
    classes += ` ${styles["error-input"]}`;
  }
  return (
    <li className={styles["numeric-input"]}>
      <label htmlFor={className}>{label}</label>
      <input
        type="number"
        className={classes}
        id={className}
        value={value}
        onChange={handleNumberInputChange}
      />
      {error && <span className={styles["error"]}>{error}</span>}
    </li>
  );
}
