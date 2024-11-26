import { CSSProperties, useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import GridConfigButton from "./UI/GridButton";
import GridButtonWindow from "./GridButtonWindow";
import { GridConfigSlider } from "./GridConfigSlider.tsx";
import { subtractWithSaturation8bit } from "../utils.tsx";
import { CodeListing } from "./CodeListing.tsx";
import Grid from "./Grid.tsx";
import { AspectStates } from "../models/AspectsState.ts";
import GridElement from "./UI/GridElement.tsx";

export default function GridPage() {
  const numberOfElements = 20;

  const [cssProps, setCssProps] = useState<CSSProperties>({
    gridAutoFlow: "dense",
    gridTemplateColumns: "100",
    gridAutoRows: "100",
    gap: "10",
  });

  const [selectedAspects, setSelectedAspects] = useState<AspectStates>([
    {
      id: 1,
      aspectClass: "aspect_1_to_2",
      aspectText: "1 to 2",
      selected: true,
    },
    {
      id: 2,
      aspectClass: "aspect_2_to_1",
      aspectText: "2 to 1",
      selected: true,
    },
    {
      id: 3,
      aspectClass: "aspect_1_to_1",
      aspectText: "1 to 1",
      selected: true,
    },
    {
      id: 4,
      aspectClass: "aspect_3_to_1",
      aspectText: "3 to 1",
      selected: true,
    },
    {
      id: 5,
      aspectClass: "aspect_1_to_3",
      aspectText: "1 to 3",
      selected: true,
    },
  ]);

  const [elements, setElements] = useState(getGeneratedElements);

  const aspectButtons = selectedAspects.map((el, index) => {
    return (
      <GridConfigButton
        key={index}
        name={el.aspectText}
        handleClick={() => {
          checkAspect(el.id);
        }}
        style={el.selected ? {} : { textDecoration: "line-through" }}
      />
    );
  });

  function getRandomAspect() {
    const filteredAspects = selectedAspects.filter((e) => {
      return e.selected == true;
    });

    if (filteredAspects.length == 0) {
      return styles[selectedAspects[0].aspectClass];
    }

    const randomIndex = Math.floor(Math.random() * filteredAspects.length);
    return styles[filteredAspects[randomIndex].aspectClass];
  }

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function getGeneratedElements() {
    const colors: Array<Array<number>> = [];
    for (let i = 0; i < numberOfElements; i++) {
      colors.push(getRandomColor());
    }

    return Array.from({ length: numberOfElements }).map((_, index) => (
      <GridElement
        aspect={getRandomAspect()}
        color={colors[index]}
        index={index}
      ></GridElement>
    ));
  }

  function setGridCss(newProps: CSSProperties) {
    const finalProps: CSSProperties = {
      ...cssProps,
      ...newProps,
    };

    setCssProps(finalProps);
  }

  function setGapSizeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setGridCss({
      gap: e.target.value,
    });
  }

  function setElementSizeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setGridCss({
      gridTemplateColumns: e.target.value,
      gridAutoRows: e.target.value,
    });
  }

  function checkAspect(id: number) {
    const newAspects = [...selectedAspects];
    newAspects.forEach((element) => {
      if (element.id == id) {
        element.selected = !element.selected;
      }
    });

    setSelectedAspects(newAspects);
  }

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
                  setElements(getGeneratedElements);
                }}
              />
              <GridConfigButton
                name={cssProps.gridAutoFlow}
                handleClick={() => {
                  const newProps: CSSProperties = {};
                  newProps.gridAutoFlow =
                    cssProps.gridAutoFlow == "dense" ? "row" : "dense";
                  setGridCss(newProps);
                }}
              />
              <GridConfigSlider
                defaultValue={cssProps.gridTemplateColumns?.valueOf()}
                name="Element size"
                handleOnChange={setElementSizeHandler}
              ></GridConfigSlider>
              <GridConfigSlider
                defaultValue={cssProps.gap?.valueOf()}
                name="Gap size"
                handleOnChange={setGapSizeHandler}
              ></GridConfigSlider>
            </GridButtonWindow>
          </div>

          <div className={styles["code-listing-wrapper"]}>
            <CodeListing cssProps={cssProps} />
          </div>
          <Grid css={cssProps}>{elements}</Grid>
        </div>
      </div>
    </div>
  );
}
