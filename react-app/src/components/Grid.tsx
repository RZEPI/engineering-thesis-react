import { useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import GridConfigButton from "./UI/GridButton";

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

  function subtractWithSaturation8bit(amount: number, value: number) {
    const retVal = value - amount < 0 ? 0 : value - amount;
    return retVal;
  }

  const aspectButtons = selectedAspects.map((el) => {
    return (
      <>
        <button
          onClick={() => {
            selectAspectID(el.id);
          }}
          style={el.selected ? {} : { textDecoration: "line-through" }}
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
    const color: Array<Array<number>> = [];

    for (let i = 0; i < numberOfElements; i++) {
      color.push(getRandomColor());
    }

    return Array.from({ length: numberOfElements }).map((_, index) => (
      <div
        key={index}
        className={`${styles["element"]} ${getRandomAspect()}`}
        style={{
          backgroundColor: "rgb(" + color[index].join(", ") + ")",
          borderColor:
            "rgb(" +
            subtractWithSaturation8bit(60, color[index][0]).toString() +
            ", " +
            subtractWithSaturation8bit(60, color[index][1]).toString() +
            ", " +
            subtractWithSaturation8bit(60, color[index][2]).toString() +
            ")",
          textAlign: "center",
          alignContent: "center",
          fontSize: "2rem",
          color: "black",
        }}
      >
        <span>{index}</span>
      </div>
    ));
  };

  const [elements, setElements] = useState(generateElements);

  return (
    <div style={{ width: "100%", backgroundColor: "inherit" }}>
      <div className={styles["windows-container"]}>
        <div className={styles["v-btn-window"]}>
          <span className={styles["title"]}>Aspects</span>
          <div className={styles["v-btn-cont"]}>{aspectButtons}</div>
        </div>

        <div className={styles["v-btn-window"]}>
          <span className={styles["title"]}>Grid options</span>
          <div className={styles["v-btn-cont"]}>
            <GridConfigButton
              name="Generate"
              handleClick={() => {
                setElements(generateElements);
              }}
            />
            <GridConfigButton
              name={isDense ? "dense" : "row"}
              handleClick={() => {
                setDense(!isDense);
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={styles["grid-main"]}
        style={isDense ? { gridAutoFlow: "dense" } : {}}
      >
        {elements}
      </div>
    </div>
  );
}
