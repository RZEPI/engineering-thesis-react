import NumericFilterInput from "./NumericFilterInput";
import { NumericFilterTabProps } from "../../models/table/NumericFilterTabProps";

import styles from "../../styles/table/NumericFilterTab.module.css";

export default function NumericFilterTab({
  currentFilter,
  activeTab,
  handleIsOpenChange,
  handleNumericInputChange,
}: NumericFilterTabProps) {
  const headerLabel =
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + " range";
  return (
    <>
      <li className={styles["header"]}>{headerLabel}</li>
      <NumericFilterInput
        className="min"
        value={currentFilter.min}
        handleChange={handleNumericInputChange}
        key={`min_${activeTab}`}
      />
      <NumericFilterInput
        className="max"
        value={currentFilter.max}
        handleChange={handleNumericInputChange}
        key={`max_${activeTab}`}
      />
      <li key={`interval_${activeTab}`}>
        <label htmlFor="open-interval">Open interval</label>
        <input
          type="checkbox"
          className={styles["open-interval"]}
          id="open-interval"
          checked={currentFilter.isOpen}
          onChange={handleIsOpenChange}
        />
      </li>
    </>
  );
}
