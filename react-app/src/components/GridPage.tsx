import { CSSProperties, useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import GridConfigButton from "./UI/GridButton";
import GridButtonWindow from "./GridButtonWindow";
import { subtractWithSaturation8bit } from "../utils.tsx";
import { CodeListing } from "./CodeListing.tsx";
import Grid from "./Grid.tsx";
export default function GridPage() {
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

  const [cssProps, setCssProps] = useState<CSSProperties>({
    gridAutoFlow: "dense",
  });

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
    <div className={styles["page-wrapper"]}>
      <div className={styles["page-content"]}>
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
                name={cssProps.gridAutoFlow}
                handleClick={() => {
                  const newProps: CSSProperties = {};
                  newProps.gridAutoFlow =
                    cssProps.gridAutoFlow == "dense" ? "row" : "dense";
                  setCssProps(newProps);
                  console.log(cssProps.gridAutoFlow);
                }}
              />
            </GridButtonWindow>
          </div>

          <div className={styles["code-listing-wrapper"]}>
            <CodeListing cssProps={cssProps} />
          </div>
          <Grid cssProps={cssProps}>{elements}</Grid>
        </div>
      </div>
    </div>
  );
}