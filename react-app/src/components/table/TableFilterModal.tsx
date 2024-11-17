import { forwardRef, useEffect, useState } from "react";

import BaseModal from "../UI/BaseModal";
import StringFilterInput from "./StringFilterInput";

import { DialogHandle } from "../../models/DialogHandle";
import { TableFilterModalProps } from "../../models/table/TableFilterModalProps";
import { TableFilter, IntFilter } from "../../models/table/TableFilter";

import styles from "../../styles/table/TableFilterModal.module.css";
import NumericFilterTab from "./NumericFilterTab";
import { makeDefaultFilter } from "../../static/RandomDataTables";

const TableFilterModal = forwardRef<DialogHandle, TableFilterModalProps>(
  ({ filter, setFilter }, ref) => {
    const tabs = Object.keys(filter) as Array<keyof typeof filter>;
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [currentFilter, setCurrentFilter] = useState<IntFilter>(filter.id);

    useEffect(() => {
      const currFilter = filter[activeTab as keyof TableFilter];
      if (!Array.isArray(currFilter)) setCurrentFilter(currFilter);
    }, [activeTab, filter, setCurrentFilter]);

    let filterForm = <></>;

    function handleTabClick(tab: string) {
      setActiveTab(tab);
    }

    function handleNameCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
      const name = e.target.value;
      setFilter((prevFilter) => {
        const changedName = prevFilter.name.map((nameFilter) => {
          if (nameFilter.value === name) {
            return { ...nameFilter, isChecked: !nameFilter.isChecked };
          }
          return nameFilter;
        });
        return {
          ...prevFilter,
          name: changedName,
        };
      });
    }

    function handleNumericInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.target.value);
      if (e.target.id === "min")
        setFilter((prevFilter) => ({
          ...prevFilter,
          [activeTab]: { ...currentFilter, min: value },
        }));
      else
        setFilter((prevFilter) => ({
          ...prevFilter,
          [activeTab]: { ...currentFilter, max: value },
        }));
    }

    function handleIsOpenChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFilter((prevState) => ({
        ...prevState,
        [activeTab]: { ...currentFilter, isOpen: e.target.checked },
      }));
    }
    function handleClearFilter() {
      if (ref && "current" in ref && ref.current) {
        ref.current.close();
      }
      setFilter({ ...makeDefaultFilter() });
    }

    if (activeTab === "name") {
      filterForm = (
        <>
          {filter.name.map((nameFilter) => {
            return (
              <StringFilterInput
                className={nameFilter.value}
                filterValue={nameFilter}
                handleChange={handleNameCheckboxChange}
                key={nameFilter.value}
              />
            );
          })}
        </>
      );
    } else {
      filterForm = (
        <NumericFilterTab
          currentFilter={currentFilter}
          activeTab={activeTab}
          handleIsOpenChange={handleIsOpenChange}
          handleNumericInputChange={handleNumericInputChange}
          key={
            currentFilter.min !== undefined || currentFilter.max !== undefined
              ? "defined"
              : "undefined"
          }
        />
      );
    }

    return (
      <BaseModal ref={ref} title={"Table Filter"}>
        <ul className={styles.tabs}>
          {tabs.map((tab) => {
            return (
              <li
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={tab === activeTab ? styles["active"] : undefined}
              >
                {tab.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <div className={styles["filter-choice"]}>
          <ul className={styles["filter-form"]}>{filterForm}</ul>
        </div>
        <div className={styles["clear-filter__container"]}>
          <button
            className={styles["clear-filter__button"]}
            onClick={handleClearFilter}
          >
            Clear filter
          </button>
        </div>
      </BaseModal>
    );
  },
);

export default TableFilterModal;
