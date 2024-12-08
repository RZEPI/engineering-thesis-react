import { Link } from "react-router-dom";
import styles from "../../styles/FeatureDescription.module.css";
import { FeatureDescriptionProps } from "../../models/FeatureDescriptionProps";
export default function FeatureDescription({site, isFirst, isLast, onPreviousClick, onNextClick} : FeatureDescriptionProps) {

    function handlePreviousClick() {
        if(isFirst) return;
        onPreviousClick();
    }
    function handleNextClick() {
        if(isLast) return;
        onNextClick();
    }

    const leftButtonClass = isFirst ? styles["inactive"] : "";
    const rightButtonClass = isLast ? styles["inactive"] : "";

    return (
        <div className={styles["container"]}>
            <h1>{ site.label }</h1>
            <div className={styles["site-description"]}>
                <button className={leftButtonClass} onClick={handlePreviousClick}>&lt;</button>
                <p>
                    { site.description }
                </p>
                <button className={rightButtonClass} onClick={handleNextClick}>&gt;</button>
            </div>
            <div className={styles["goto-button__container"]}>
                {!isFirst && <Link to={site.link}> Go </Link>}
            </div>
     </div>
    );
}