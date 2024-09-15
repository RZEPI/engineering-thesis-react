import { useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import GridConfigButton from "./UI/GridButton";
import GridButtonWindow from "./GridButtonWindow";

export default function Grid() {
  const numberOfElements = 20;

  function getRandomAspect() {
    const aspects = selectedAspects.filter((e) => {
      return e.selected == true;
    });

    if (aspects.length == 0) {
      return styles[selectedAspects[0].aspect];
    }
    const randomIndex = Math.floor(Math.random() * aspects.length);
    return styles[aspects[randomIndex].aspect];
  }

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function generateElements() {
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
  }

  const [isDense, setDense] = useState<boolean>(false);

  const [selectedAspects, setSelectedAspects] = useState([
    { id: 1, aspect: "aspect_1_to_2", selected: true },
    { id: 2, aspect: "aspect_2_to_1", selected: true },
    { id: 3, aspect: "aspect_1_to_1", selected: true },
    { id: 4, aspect: "aspect_3_to_1", selected: true },
    { id: 5, aspect: "aspect_1_to_3", selected: true },
  ]);

  const [elements, setElements] = useState(generateElements);

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

  const aspectButtons = selectedAspects.map((el, index) => {
    return (
      <GridConfigButton
        key={index}
        name={el.aspect}
        handleClick={() => {
          selectAspectID(el.id);
        }}
        style={el.selected ? {} : { textDecoration: "line-through" }}
      />
    );
  });

  return (
    <div style={{ width: "100%", backgroundColor: "inherit" }}>
      <div className={styles["windows-container"]}>
        <GridButtonWindow title="Aspects">{aspectButtons}</GridButtonWindow>
        <GridButtonWindow title="Grid options">
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
        </GridButtonWindow>
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
