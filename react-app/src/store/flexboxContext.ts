import { createContext, useReducer, CSSProperties, PropsWithChildren, createElement } from "react";

import { AlignItemsOptions } from "../models/flexbox-generator/AlignItemsOptions.ts";
import { ContentOptions } from "../models/flexbox-generator/ContentOptions.ts";
import { FlexboxElement } from "../models/flexbox-generator/FlexboxElement.ts";
import { drawColor } from "../util/util.ts";

export interface FlexboxState {
  wrapping: boolean;
  direction: boolean;
  justifyContent: ContentOptions;
  alignItems: AlignItemsOptions;
  alignContent: ContentOptions;
  content: FlexboxElement[];
}

enum ActionTypes {
  TOGGLE_WRAPPING = "TOGGLE_WRAPPING",
  TOGGLE_DIRECTION = "TOGGLE_DIRECTION",
  SET_ALIGN_ITEMS = "SET_ALIGN_ITEMS",
  SET_JUSTIFY_CONTENT = "SET_JUSTIFY_CONTENT",
  SET_ALIGN_CONTENT = "SET_ALIGN_CONTENT",
  ADD_ELEMENT = "ADD_ELEMENT",
  REMOVE_ELEMENT = "REMOVE_ELEMENT",
}

export type FlexboxContextType = {
  state: FlexboxState;
  toggleWrapping: () => void;
  toggleDirection: () => void;
  setAlignItems: (alignItems: AlignItemsOptions) => void;
  setJustifyContent: (justifyContent: ContentOptions) => void;
  setAlignContent: (alignContent: ContentOptions) => void;
  addElement: () => void;
  removeElement: (id: number) => void;
}

type ActionType ={
  type: ActionTypes;
  payload: AlignItemsOptions | ContentOptions | number | null;
}
const INIT_AMONT_OF_ELEMENTS = 5000

const defaultContent: FlexboxElement[] = [];

for( let i = 1; i <= INIT_AMONT_OF_ELEMENTS; i++ ){
  const color = drawColor();
  defaultContent.push({id: i, color: color});
}

const initialState: FlexboxState = {
  wrapping: false,
  direction: false,
  justifyContent: ContentOptions.CENTER,
  alignItems: AlignItemsOptions.CENTER,
  alignContent: ContentOptions.CENTER,
  content: defaultContent,
};

export const flexboxContent = (state: FlexboxState) => state.content;
export const flexboxStyles = (state: FlexboxState) => {
  const stylesObj: CSSProperties = {
    flexWrap: state.wrapping ? "wrap" : "nowrap",
    flexDirection: state.direction ? "column" : "row",
    justifyContent: state.justifyContent,
    alignItems: state.alignItems,
  };
  if (state.wrapping)
    stylesObj.alignContent = state.alignContent;
  return stylesObj;
};

export const flexboxWrapping = (state: FlexboxState) => state.wrapping;

export const FlexboxContext = createContext<FlexboxContextType>({
  state: initialState,
  toggleWrapping: () => {},
  toggleDirection: () => {},
  setAlignItems: () => {},
  setJustifyContent: () => {},
  setAlignContent: () => {},
  addElement: () => {},
  removeElement: () => {},
});

function flexBoxReducer(state: FlexboxState, action: ActionType) {
  switch (action.type) {
    case ActionTypes.TOGGLE_WRAPPING:
      return {...state, wrapping: !state.wrapping};
    case ActionTypes.TOGGLE_DIRECTION:
      return {...state, direction: !state.direction};
    case ActionTypes.SET_ALIGN_ITEMS:
      return {...state, alignItems: action.payload as AlignItemsOptions};
    case ActionTypes.SET_JUSTIFY_CONTENT:
      return {...state, justifyContent: action.payload as ContentOptions};
    case ActionTypes.SET_ALIGN_CONTENT:
      return {...state, alignContent: action.payload as ContentOptions};
    case ActionTypes.ADD_ELEMENT:
      return {...state, content: [...state.content, {id: state.content.length + 1, color: drawColor()}]};
    case ActionTypes.REMOVE_ELEMENT:
      return {...state, content: state.content.filter((element) => element.id !== (action.payload as unknown as number))};
    default:
      return state;
  }
}

export default function FlexboxContextProvider({children}: PropsWithChildren<{}>) {
  const [flexboxState, flexboxDispatch] = useReducer<React.Reducer<FlexboxState, ActionType>>(flexBoxReducer, initialState);

  function handleToggleAction(actionType: ActionTypes) {
    return flexboxDispatch({type: actionType, payload: null});
  }
  function handleSetAction(actionType: ActionTypes, payload: AlignItemsOptions | ContentOptions) {
    return flexboxDispatch({type: actionType, payload: payload});
  }

  function handleAddElement() {
    return flexboxDispatch({type: ActionTypes.ADD_ELEMENT, payload: null});
  }

  function handleRemoveElement(id: number) {
    return flexboxDispatch({type: ActionTypes.REMOVE_ELEMENT, payload: id});
  }

  const contextValue: FlexboxContextType  = {
    state: flexboxState,
    toggleWrapping: () => handleToggleAction(ActionTypes.TOGGLE_WRAPPING),
    toggleDirection: () => handleToggleAction(ActionTypes.TOGGLE_DIRECTION),
    setAlignItems: (alignItems: AlignItemsOptions) => handleSetAction(ActionTypes.SET_ALIGN_ITEMS, alignItems),
    setJustifyContent: (justifyContent: ContentOptions) => handleSetAction(ActionTypes.SET_JUSTIFY_CONTENT, justifyContent),
    setAlignContent: (alignContent: ContentOptions) => handleSetAction(ActionTypes.SET_ALIGN_CONTENT, alignContent),
    addElement: handleAddElement,
    removeElement: (id: number) => handleRemoveElement(id),
  };

  return createElement(FlexboxContext.Provider, { value: contextValue }, children);
}