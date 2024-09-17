import SelectInput from "./SelectInput";
import ToggleInput from "./ToggleInput";

import { useAppDispatch } from "../../../store/hooks";
import { flexboxActions } from "../../../store/flexbox";

import { JustifyContentOptions } from "../../../models/flexbox-generator/JustifyContentOptions";
import { AlignItemsOptions } from "../../../models/flexbox-generator/AlignItemsOptions";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import styles from "../../../styles/flexbox/FlexboxForm.module.css";

export default function FlexboxForm() {
  const dispatch = useAppDispatch();

  const justifyContentOptionsList = Object.values(JustifyContentOptions).filter(
    (value) => isNaN(Number(value)),
  );
  const alignItemsOptionsList = Object.values(AlignItemsOptions).filter(
    (value) => isNaN(Number(value)),
  );

  function handleToggleDirection() {
    dispatch(flexboxActions.toggleDirection());
  }

  function handleToggleWrapping() {
    dispatch(flexboxActions.toggleWrapping());
  }

  function handleSelection<T>(
    chosenOption: string,
    action: ActionCreatorWithPayload<T>,
    optionList: T[],
  ) {
    const parsedOption = optionList.find(
      (optionItem) => optionItem === chosenOption,
      optionList[0],
    );
    dispatch(action(parsedOption!));
  }

  function handleJustifyContentChange(chosenOption: string) {
    handleSelection<JustifyContentOptions>(
      chosenOption,
      flexboxActions.setJustifyContent,
      justifyContentOptionsList,
    );
  }

  function handleAlignItemsChange(chosenOption: string) {
    handleSelection<AlignItemsOptions>(
      chosenOption,
      flexboxActions.setAlignItems,
      alignItemsOptionsList,
    );
  }

  function addContainer() {
    dispatch(flexboxActions.addElement());
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
        optionList={justifyContentOptionsList}
        selectionFunc={handleJustifyContentChange}
      />
      <SelectInput
        selectHeader="Align items"
        optionList={alignItemsOptionsList}
        selectionFunc={handleAlignItemsChange}
      />

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
