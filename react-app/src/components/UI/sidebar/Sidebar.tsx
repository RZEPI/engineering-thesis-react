import { useState } from "react";
import styles from "../../../styles/Sidebar.module.css";
import SidebarLink from "./SidebarLink";
import { sites } from "../../../static/sites";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  let buttonClasses: string = styles["burger-button"];

  function toggleExpand() {
    setIsExpanded((prevState) => !prevState);
  }

  if (isExpanded) buttonClasses += ` ${styles["expanded"]}`;
  return (
    <>
      <header className={styles["button-header"]}>
        <div className={buttonClasses} onClick={toggleExpand}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      {isExpanded && (
        <nav className={styles["sidebar-navigation"]}>
          <ul className={styles["link-container"]}>
            {sites.map((site) => {
              return (
                <SidebarLink
                  label={site.label}
                  link={site.link}
                  imageSrc={site.imageSrc}
                  key={site.label}
                />
              );
            })}
          </ul>
        </nav>
      )}
      {isExpanded && (
        <div className={styles["backdrop"]} onClick={toggleExpand}></div>
      )}
    </>
  );
}
