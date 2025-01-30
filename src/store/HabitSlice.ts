import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Habit {
    id: string,
    name: string,
    Frequency: "daily" | "weekly",
    completedDates: string[],
    createdAt: string
}
interface HabitState {
    habits: Habit[],
}
const initialState: HabitState = {
    habits: [],
}

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabits: (state, action: PayloadAction<{ name: string; Frequency: "daily" | "weekly" }>) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                Frequency: action.payload.Frequency,
                completedDates: [],
                createdAt: new Date().toISOString()

            }
            state.habits.push(newHabit)

        }
    }
})

export const { addHabits } = habitSlice.actions
export default habitSlice.reducer