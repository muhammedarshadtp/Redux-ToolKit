import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./HabitSlice"


const store= configureStore({
    reducer:{
        habit:habitsReducer,
    },
})
export type RootState= ReturnType <typeof store.getState>
export type dispatch= typeof store.dispatch

export default store;