import { useState } from "react";
import styles from "../styles/GridPage.module.css";
import { aspects } from "../static/GridElements";
import { colors } from "../static/GridElements";

export default function Grid() {

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getRandomAspect = () => {
    const randomIndex = Math.floor(Math.random() * aspects.length);
    return styles[aspects[randomIndex]];
  };
  const [isDense, setDense] = useState<boolean>(false);

  const numberOfElements = 20;

  const [elements, setElements] = useState(
    Array.from({ length: numberOfElements }).map((_, index) => (
      <span
        key={index}
        className={`${styles["element"]} ${getRandomAspect()}`}
        style={{ backgroundColor: getRandomColor() }}
      >
        {index}
      </span>
    )),
  );

  return (
    <div>
      <button
        onClick={() => {
          setDense(!isDense);
        }}
      >
        dense button
      </button>
      <button onClick={() => { setElements([])}}>reset</button>
      <div
        className={styles["grid-main"]}
        style={isDense ? { gridAutoFlow: "dense" } : null}
      >
        {elements}
      </div>
    </div>
  );
}
