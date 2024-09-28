import { forwardRef, useState } from "react";
import BaseModal from "../UI/BaseModal";
import { DialogHandle } from "../../models/DialogHandle";
import { TableFilterModalProps } from "../../models/table/TableFilterModalProps";

import styles from "../../styles/table/TableFilterModal.module.css";

const TableFilterModal = forwardRef<DialogHandle, TableFilterModalProps>(
  ({filter}, ref) => {
    const tabs = Object.keys(filter);
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);

    function handleTabClick(tab: string){
        setActiveTab(tab);
    }

    return (
      <BaseModal ref={ref} title={"Table Filter"}>
        <ul className={styles.tabs}>
          {tabs.map((tab) => {
            return <li key={tab} onClick={() => handleTabClick(tab)}>{tab.toUpperCase()}</li>;
          })}
        </ul>
        <div className={styles["filter-choice"]}>
          <p>{activeTab}</p>
        </div>
      </BaseModal>
    );
  },
);

export default TableFilterModal;
