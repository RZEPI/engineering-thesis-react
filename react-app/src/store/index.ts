import {configureStore} from '@reduxjs/toolkit';
import flexboxReducer from './flexbox';

export const store = configureStore({
    reducer: {
        flexbox: flexboxReducer,
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']