import { useState } from "react";
import styles from "../styles/GridPage.module.css";
import { aspects } from "../static/GridElements";
import { colors } from "../static/GridElements";

export default function Grid() {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [selectedAspects, setSelectedAspects] = useState([
    { id: 1, aspect: "aspect_1_to_2", selected: true },
    { id: 2, aspect: "aspect_2_to_1", selected: true },
    { id: 3, aspect: "aspect_1_to_1", selected: true },
    { id: 4, aspect: "aspect_3_to_1", selected: true },
    { id: 5, aspect: "aspect_1_to_3", selected: true },
  ]);

  function selectAspectID(id: number) {
    const newAspects = [...selectedAspects];
    newAspects.forEach((element) => {
      if (element.id == id) {
        element.selected = !element.selected;
      }
    });

    setSelectedAspects(newAspects);
  }

  const aspectButtons = selectedAspects.map((el) => {
    return (
      <>
        <br />
        <button
          onClick={() => {
            selectAspectID(el.id);
          }}
          style={el.selected ? null : { textDecoration: "line-through" }}
        >
          {el.aspect}
        </button>
      </>
    );
  });

  const getRandomAspect = () => {
    const aspects = selectedAspects.filter((e) => {
      return e.selected == true;
    });

    if (aspects.length == 0) {
      return styles[selectedAspects[0].aspect];
    }
    const randomIndex = Math.floor(Math.random() * aspects.length);
    return styles[aspects[randomIndex].aspect];
  };
  const [isDense, setDense] = useState<boolean>(false);

  const numberOfElements = 20;

  const generateElements = () => {
    return Array.from({ length: numberOfElements }).map((_, index) => (
      <span
        key={index}
        className={`${styles["element"]} ${getRandomAspect()}`}
        style={{ backgroundColor: getRandomColor() }}
      >
        {index}
      </span>
    ));
  };

  const [elements, setElements] = useState(generateElements);

  return (
    <div>
      <button
        onClick={() => {
          setDense(!isDense);
        }}
      >
        {isDense ? "dense" : "row"}
      </button>
      <div>
        <span>Aspects:</span>
        {aspectButtons}
      </div>
      <button
        onClick={() => {
          setElements(generateElements);
        }}
      >
        Generate
      </button>
      <div
        className={styles["grid-main"]}
        style={isDense ? { gridAutoFlow: "dense" } : null}
      >
        {elements}
      </div>
    </div>
  );
}
