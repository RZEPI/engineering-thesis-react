import ToggleSwitch from "../../UI/ToggleSwitch";

import styles from "../../../styles/flexbox/ToggleInput.module.css"

import { ToggleInputProps } from "../../../models/flexbox-generator/ToggleInputProps";

export default function ToggleInput({
  inputHeader,
  choices,
  toggleFunc
}: ToggleInputProps) {
  const inputName = inputHeader.toLowerCase().replace(" ", "-");
  return (
    <>
      <h3 className={styles.header}>{inputHeader}</h3>
      <div className={styles["input-container"]}>
        <label>{choices[0]}</label>
        <ToggleSwitch inputName={inputName} toggleFunc={toggleFunc} />
        <label>{choices[1]}</label>
      </div>
    </>
  );
}
