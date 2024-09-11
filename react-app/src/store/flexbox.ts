import { CSSProperties } from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { AlignItemsOptions } from '../models/flexbox-generator/AlignItemsOptions';
import { ContentOptions } from '../models/flexbox-generator/ContentOptions.ts';
import { FlexboxElement } from '../models/flexbox-generator/FlexboxElement';
import { RootState } from '.';

interface FlexboxState
{
    wrapping: boolean;
    direction: boolean;
    justifyContent: ContentOptions
    alignItems: AlignItemsOptions
    alignContent: ContentOptions,
    content: FlexboxElement[]
}

const DefaultContent:FlexboxElement[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

const initialState:FlexboxState = {
    wrapping: false,
    direction: false,
    justifyContent: ContentOptions.CENTER,
    alignItems: AlignItemsOptions.CENTER,
    alignContent: ContentOptions.CENTER,
    content: DefaultContent,
}

const flexSlice = createSlice({
    name: 'flexbox',
    initialState,
    reducers: {
        toggleWrapping(state){
            state.wrapping = !state.wrapping;
        },
        toggleDirection(state){
            state.direction = !state.direction;
        },
        setAlignItems(state, action: PayloadAction<AlignItemsOptions>)
        {
            state.alignItems = action.payload;
        },
        setJustifyContent(state, action: PayloadAction<ContentOptions>)
        {
            state.justifyContent = action.payload;
        },
        setAlignContent(state, action: PayloadAction<ContentOptions>)
        {
            state.alignContent = action.payload;
        },
        addElement(state)
        {
            const content = state.content;
            let lastElementId = 0;
            if(content.length !== 0 )
                lastElementId = content[content.length-1].id;

            state.content.push({id:lastElementId+1});
        },
        removeElement(state, action: PayloadAction<number>)
        {
            const content = state.content;
            state.content = content.filter((element) => element.id !== action.payload)
        }
    }
});

export const flexboxContent = (state: RootState) => state.flexbox.content;
export const flexboxStyles = (state: RootState) => {
    const stylesObj: CSSProperties = {
        flexWrap: state.flexbox.wrapping ? "wrap" : "nowrap",
        flexDirection: state.flexbox.direction ? "column" : "row",
        justifyContent: state.flexbox.justifyContent,
        alignItems: state.flexbox.alignItems
    }
    if(state.flexbox.wrapping)
        stylesObj.alignContent = state.flexbox.alignContent;
    return stylesObj;
}

export const flexboxWrapping = (state: RootState) => state.flexbox.wrapping;

export const flexboxActions = flexSlice.actions;

export default flexSlice.reducer;