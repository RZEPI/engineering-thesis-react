import { useState } from "react";
import styles from "../styles/HomePage.module.css";
import { sites } from "../static/sites";
import FeatureDescription from "../components/UI/FeatureDescription";

export default function HomePage() {
  const [siteIdx, setSiteIdx] = useState(0);
  const isFirst = siteIdx === 0;
  const isLast = siteIdx === sites.length - 1;

  function handlePreviousClick() {
    if (isFirst) return;
    setSiteIdx((prevIdx) => prevIdx - 1);
  }
  function handleNextClick() {
    if (isLast) return;
    setSiteIdx((prevIdx) => prevIdx + 1);
  }

  return (
    <div className={styles["main-container"]}>
      <FeatureDescription
        site={sites[siteIdx]}
        isFirst={isFirst}
        isLast={isLast}
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
      />
      <div className={styles["gradient"]}></div>
    </div>
  );
}
