import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "../../../styles/Sidebar.module.css";
import SidebarLink from "./SidebarLink";
import { sites } from "../../../static/sites";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  let buttonClasses: string = styles["burger-button"];
  let headerClasses: string = styles["button-header"];

  function toggleExpand() {
    setIsExpanded((prevState) => !prevState);
  }

  if (isExpanded) buttonClasses += ` ${styles["expanded"]}`;
  else headerClasses += ` ${styles["collapsed"]}`;
  if (isExpanded) headerClasses += ` ${styles["border-shadow"]}`;

  return (
    <>
      <header className={headerClasses}>
        <div className={buttonClasses} onClick={toggleExpand}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <AnimatePresence>
        {isExpanded && (
          <motion.nav
            key="sidebar-navigation"
            className={styles["sidebar-navigation"]}
            transition={{
              duration: 0.3,
              ease: isExpanded ? "easeOut" : "easeIn",
            }}
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            exit={{ width: 0 }}
          >
            <motion.ul
              className={styles["link-container"]}
              transition={{
                duration: 0.1,
              }}
              exit={{ opacity: 0 }}
            >
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
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
      {isExpanded && (
        <div className={styles["backdrop"]} onClick={toggleExpand}></div>
      )}
    </>
  );
}
