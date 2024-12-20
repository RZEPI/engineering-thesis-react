import { CSSProperties, useState } from "react";
import styles from "../styles/GridPage.module.css";
import { colors } from "../static/GridElements";
import { GridInitialElementsAspects } from "../static/GridInitialElementsAspects.ts";
import GridElement from "../components/UI/GridElement.tsx";
import GridConfigButton from "../components/UI/GridButton.tsx";
import GridButtonWindow from "../components/grid/GridButtonWindow.tsx";
import { GridConfigSlider } from "../components/grid/GridConfigSlider.tsx";
import { CodeListing } from "../components/CodeListing.tsx";
import Grid from "../components/grid/Grid.tsx";
import { AspectState } from "../models/grid/AspectsState.ts";
import { GridElementModel } from "../models/grid/GridElementModel.ts";

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

  function changeGridAutoFlow() {
    const newProps: CSSProperties = {};
    newProps.gridAutoFlow = cssProps.gridAutoFlow == "dense" ? "row" : "dense";
    setGridCss(newProps);
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
              name={cssProps.gridAutoFlow as string}
              handleClick={changeGridAutoFlow}
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
        <CodeListing cssProps={cssProps} />
        <Grid css={cssProps}>{renderedElements}</Grid>
      </div>
    </div>
  );
}
