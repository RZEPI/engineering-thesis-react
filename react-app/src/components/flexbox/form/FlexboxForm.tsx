import { useContext } from "react";

import SelectInput from "./SelectInput";
import ToggleInput from "./ToggleInput";
import { FlexboxContext } from "../../../store/flexboxContext";

import { ContentOptions } from "../../../models/flexbox-generator/ContentOptions.ts";
import { AlignItemsOptions } from "../../../models/flexbox-generator/AlignItemsOptions";

import styles from "../../../styles/flexbox/FlexboxForm.module.css";

export default function FlexboxForm() {
  const context = useContext(FlexboxContext);
  const {wrapping} = context.state;

  const contentOptionsList = Object.values(ContentOptions).filter((value) =>
    isNaN(Number(value)),
  );
  const alignItemsOptionsList = Object.values(AlignItemsOptions).filter(
    (value) => isNaN(Number(value)),
  );

  function handleToggleDirection() {
    context.toggleDirection();
  }

  function handleToggleWrapping() {
    context.toggleWrapping();
  }

  function handleSelection<T>(
    chosenOption: string,
    action: (option: T) => void,
    optionList: T[],
  ) {
    const parsedOption = optionList.find(
      (optionItem) => optionItem === chosenOption,
      optionList[0],
    )!;
    action(parsedOption);
  }

  function handleJustifyContentChange(chosenOption: string) {
    handleSelection<ContentOptions>(
      chosenOption,
      context.setJustifyContent,
      contentOptionsList,
    );
  }

  function handleAlignItemsChange(chosenOption: string) {
    handleSelection<AlignItemsOptions>(
      chosenOption,
      context.setAlignItems,
      alignItemsOptionsList,
    );
  }

  function handleAlignContentChange(chosenOption: string) {
    handleSelection<ContentOptions>(
      chosenOption,
      context.setAlignContent,
      contentOptionsList,
    );
  }

  function addContainer() {
    context.addElement();
  }

  return (
    <form className={styles["configuration-form"]}>
      <ToggleInput
        inputHeader="Direction"
        choices={["Row", "Column"]}
        toggleFunc={handleToggleDirection}
      />
      <ToggleInput
        inputHeader="Wrapping"
        choices={["Nowrap", "Wrap"]}
        toggleFunc={handleToggleWrapping}
      />
      <SelectInput
        selectHeader="Justify content"
        optionList={contentOptionsList}
        selectionFunc={handleJustifyContentChange}
      />
      <SelectInput
        selectHeader="Align items"
        optionList={alignItemsOptionsList}
        selectionFunc={handleAlignItemsChange}
      />
      {wrapping && (
        <SelectInput
          selectHeader="Align content"
          optionList={contentOptionsList}
          selectionFunc={handleAlignContentChange}
        />
      )}

      <button
        className={styles["add-button"]}
        type="button"
        onClick={addContainer}
      >
        Add container
      </button>
    </form>
  );
}
