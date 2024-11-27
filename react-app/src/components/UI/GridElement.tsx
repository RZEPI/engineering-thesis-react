import { GridElementsProps } from "../../models/GridElementsProps";
import { subtractWithSaturation8bit } from "../../utils";
import styles from "../../styles/GridPage.module.css";

export default function GridElement({
  aspect,
  color,
  index,
}: GridElementsProps) {
  return (
    <div
      key={index}
      className={`${styles["element"]} ${aspect}`}
      style={{
        backgroundColor: "rgb(" + color.join(", ") + ")",
        borderColor:
          "rgb(" +
          subtractWithSaturation8bit(60, color[0]).toString() +
          ", " +
          subtractWithSaturation8bit(60, color[1]).toString() +
          ", " +
          subtractWithSaturation8bit(60, color[2]).toString() +
          ")",
        textAlign: "center",
        alignContent: "center",
        fontSize: "2rem",
        color: "black",
        overflow: "hidden",
      }}
    >
      <span>{index}</span>
    </div>
  );
}
