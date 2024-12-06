import { CSSProperties } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlignItemsOptions } from "../models/flexbox-generator/AlignItemsOptions";
import { ContentOptions } from "../models/flexbox-generator/ContentOptions.ts";
import { FlexboxElement } from "../models/flexbox-generator/FlexboxElement";
import { RootState } from ".";
import { drawColor } from "../util/util.ts";

export interface FlexboxState {
  wrapping: boolean;
  direction: boolean;
  justifyContent: ContentOptions;
  alignItems: AlignItemsOptions;
  alignContent: ContentOptions;
  content: FlexboxElement[];
}
const INIT_AMONT_OF_ELEMENTS = 5000;

const defaultContent: FlexboxElement[] = [];

for (let i = 1; i <= INIT_AMONT_OF_ELEMENTS; i++) {
  const color = drawColor();
  defaultContent.push({ id: i, color: color });
}

const initialState: FlexboxState = {
  wrapping: false,
  direction: false,
  justifyContent: ContentOptions.CENTER,
  alignItems: AlignItemsOptions.CENTER,
  alignContent: ContentOptions.CENTER,
  content: defaultContent,
};

const flexSlice = createSlice({
  name: "flexbox",
  initialState,
  reducers: {
    toggleWrapping(state: FlexboxState) {
      state.wrapping = !state.wrapping;
    },
    toggleDirection(state: FlexboxState) {
      state.direction = !state.direction;
    },
    setAlignItems(
      state: FlexboxState,
      action: PayloadAction<AlignItemsOptions>,
    ) {
      state.alignItems = action.payload;
    },
    setJustifyContent(
      state: FlexboxState,
      action: PayloadAction<ContentOptions>,
    ) {
      state.justifyContent = action.payload;
    },
    setAlignContent(
      state: FlexboxState,
      action: PayloadAction<ContentOptions>,
    ) {
      state.alignContent = action.payload;
    },
    addElement(state: FlexboxState) {
      const content = state.content;
      let lastElementId = 0;
      if (content.length !== 0) lastElementId = content[content.length - 1].id;

      state.content.push({ id: lastElementId + 1, color: drawColor() });
    },
    removeElement(state: FlexboxState, action: PayloadAction<number>) {
      const content = state.content;
      state.content = content.filter(
        (element) => element.id !== action.payload,
      );
    },
  },
});

export const flexboxContent = (state: RootState) => state.flexbox.content;
export const flexboxStyles = (state: RootState) => {
  const stylesObj: CSSProperties = {
    flexWrap: state.flexbox.wrapping ? "wrap" : "nowrap",
    flexDirection: state.flexbox.direction ? "column" : "row",
    justifyContent: state.flexbox.justifyContent,
    alignItems: state.flexbox.alignItems,
  };
  if (state.flexbox.wrapping)
    stylesObj.alignContent = state.flexbox.alignContent;
  return stylesObj;
};

export const flexboxWrapping = (state: RootState) => state.flexbox.wrapping;

export const flexboxActions = flexSlice.actions;

export default flexSlice.reducer;
