import { CSSProperties, useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import GridConfigButton from "./UI/GridButton";
import GridButtonWindow from "./GridButtonWindow";
import { GridConfigSlider } from "./GridConfigSlider.tsx";
import { CodeListing } from "./CodeListing.tsx";
import Grid from "./Grid.tsx";
import { AspectState } from "../models/AspectsState.ts";
import GridElement from "./UI/GridElement.tsx";
import { GridElementModel } from "../models/GridElementModel.ts";
import { GridInitialElementsAspects } from "../static/GridInitialElementsAspects.ts";

export default function GridPage() {
  const numberOfElements = 20;

  const [cssProps, setCssProps] = useState<CSSProperties>({
    gridAutoFlow: "dense",
    gridTemplateColumns: "100",
    gridAutoRows: "100",
    gap: "10",
  });

  const [selectedAspects, setSelectedAspects] = useState<AspectState[]>(
    GridInitialElementsAspects,
  );

  const [elements, setElements] = useState(generateElements);

  const renderedElements = elements.map((el, index) => (
    <GridElement
      key={index}
      aspect={el.aspectClass}
      color={el.color}
      index={index}
    ></GridElement>
  ));

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

  function generateElements() {
    const elements: Array<GridElementModel> = [];

    for (let i = 0; i < numberOfElements; i++) {
      elements.push({
        color: getRandomColor(),
        aspectClass: getRandomAspect(),
      });
    }

    return [...elements];
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
        <Grid css={cssProps}>{renderedElements}</Grid>
      </div>
    </div>
  );
}
