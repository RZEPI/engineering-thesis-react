import { forwardRef, useState } from "react";

import BaseModal from "../UI/BaseModal";
import NumericFilterInput from "./NumericFilterInput";
import StringFilterInput from "./StringFilterInput";

import { DialogHandle } from "../../models/DialogHandle";
import { TableFilterModalProps } from "../../models/table/TableFilterModalProps";
import { IntFilter } from "../../models/table/TableFilter";

import styles from "../../styles/table/TableFilterModal.module.css";

const TableFilterModal = forwardRef<DialogHandle, TableFilterModalProps>(
  ({ filter, setFilter }, ref) => {
    const tabs = Object.keys(filter);
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    let filterForm = <></>;

    function handleTabClick(tab: string) {
      setActiveTab(tab);
    }

    function handleNameCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
      const name = e.target.value;
      const newFilter = { ...filter };
      const changedName = newFilter.name.find((n) => n.value === name)!;
      changedName.isChecked = !changedName.isChecked;
      setFilter(newFilter);
    }

    function handleNumericInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.target.value);
      const newFilter = { ...filter };
      const currFilter = activeTab === "id" ? newFilter.id : newFilter.level;
      if (e.target.className === "min") currFilter.min = value;
      else currFilter.max = value;
      setFilter(newFilter);
    }

    function handleIsOpenChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newFilter = { ...filter };
      const currFilter = activeTab === "id" ? newFilter.id : newFilter.level;
      currFilter.isOpen = e.target.checked;
      setFilter(newFilter);
    }

    if (activeTab === "name") {
      filterForm = (
        <>
          {filter.name.map((nameFilter) => {
            return (
              <StringFilterInput
                filterValue={nameFilter}
                handleChange={handleNameCheckboxChange}
                key={nameFilter.value}
              />
            );
          })}
        </>
      );
    } else {
      let currFilter: IntFilter;
      if (activeTab === "id") currFilter = filter.id;
      else currFilter = filter.level;
      filterForm = (
        <>
          <li className={styles["header"]}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} range</li>
          <NumericFilterInput
            className="min"
            value={currFilter.min}
            handleChange={handleNumericInputChange}
            key={`min_${activeTab}`}
          />
          <NumericFilterInput
            className="max"
            value={currFilter.max}
            handleChange={handleNumericInputChange}
            key={`max_${activeTab}`}
          />
          <li key={`interval_${activeTab}`}>
            <label htmlFor="open-interval">Open interval</label>
            <input
              type="checkbox"
              className={styles["open-interval"]}
              id="open-interval"
              checked={currFilter.isOpen}
              onChange={handleIsOpenChange}
            />
          </li>
        </>
      );
    }

    return (
      <BaseModal ref={ref} title={"Table Filter"}>
        <ul className={styles.tabs}>
          {tabs.map((tab) => {
            return (
              <li key={tab} onClick={() => handleTabClick(tab)} className={tab === activeTab ? styles["active"] : undefined }>
                {tab.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <div className={styles["filter-choice"]}>
          <ul className={styles["filter-form"]}>{filterForm}</ul>
        </div>
      </BaseModal>
    );
  },
);

export default TableFilterModal;
