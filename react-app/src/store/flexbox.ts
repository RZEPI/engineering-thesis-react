import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { AlignItemsOptions } from '../models/flexbox-generator/AlignItemsOptions';
import { JustifyContentOptions } from '../models/flexbox-generator/JustifyContentOptions';
import { FlexboxElement } from '../models/flexbox-generator/FlexboxElement';
import { RootState } from '.';

interface FlexboxState
{
    wrapping: boolean;
    direction: boolean;
    justifyContent: JustifyContentOptions
    alignItems: AlignItemsOptions
    content: FlexboxElement[]
}

const initialState:FlexboxState = {
    wrapping: false,
    direction: false,
    justifyContent: JustifyContentOptions.CENTER,
    alignItems: AlignItemsOptions.CENTER,
    content: [{ id: 1 }, { id: 2 }, { id: 3 }],
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
        setJustifyContent(state, action: PayloadAction<JustifyContentOptions>)
        {
            state.justifyContent = action.payload;
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
export const flexboxActions = flexSlice.actions;

export default flexSlice.reducer;