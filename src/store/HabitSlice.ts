import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Habit {
    id: string,
    name: string,
    Frequency: "daily" | "weekly",
    completedDates: string[],
    createdAt: string
}
interface HabitState {
    habits: Habit[],
    isLoading:boolean;
    error: null | string
    
}
const initialState: HabitState = {
    habits: [],
    isLoading:false,
    error : null,
}

export const fetchHabit= createAsyncThunk("habits/fetchHabit",async()=>{
    await new Promise((reslove)=>setTimeout(reslove,1000))
    const mocHabit : Habit[]=[
        {
            id: "1",
            name: "Reading",
            Frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString()
        },
        {
            id: "2",
            name: "Eating",
            Frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString()
        }
    ]
    return mocHabit;
})

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
        },
        toggleHabit:(state,action: PayloadAction<{id: string; date:string}>)=>{
            const habit = state.habits.find((h)=>h.id === action.payload.id)
            if(habit){
                const index=habit.completedDates.indexOf(action.payload.date)
                if(index > -1){
                    habit.completedDates.slice(index,1)
                }else{
                    habit.completedDates.push(action.payload.date)
                }
            }
        },
        removeHabit: (state, action: PayloadAction<{ id: string }>) => {
           
            state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchHabit.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(fetchHabit.fulfilled,(state,action)=>{
            state.isLoading=false
            state.habits=action.payload
        })
        .addCase(fetchHabit.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.error.message || "faild to fetch habits"
        })
    }
})

export const { addHabits,toggleHabit,removeHabit } = habitSlice.actions
export default habitSlice.reducer