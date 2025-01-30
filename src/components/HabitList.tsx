import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { dispatch, RootState } from "../store/Store";
import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../store/HabitSlice";

const HabitList: React.FC =()=>{
    const {habits}=useSelector((store:RootState)=> store?.habit)
    const today= new Date().toISOString().split("T")[0]
    const dispatch = useDispatch<dispatch>()
    const getStreak=(habit: Habit)=>{
        let streak=0
        const currentDate = new Date()

        while(true){
            const dateString= currentDate.toISOString().split("T")[0]
            if(habit.completedDates.includes(dateString)){
                streak++
                currentDate.setDate(currentDate.getDate()-1)
            }else{
                break
            }
        }
        return streak;
    }

    return(
       <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        marginTop: 4,
       }}>
        {habits.map((habit)=>{
            return(
                <Paper key={habit.id} elevation={2} sx={{p:2}}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">{habit.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textTransform:"capitalize"}}>
                                {habit.Frequency}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{display:"flex", justifyContent:"flex-end", gap:1}}>
                                <Button variant="outlined"
                                color={
                                    habit.completedDates.includes(today)
                                    ? "success"
                                    : "primary"
                                }
                                startIcon={<CheckCircle/ >}
                                onClick={()=>dispatch(toggleHabit({id: habit.id, date:today}))}
                                > 
                                {habit.completedDates.includes(today)
                                    ? "Completed"
                                    : "Mark Complete"}
                                </Button>
                                <Button variant="outlined" 
                                color="error"
                                onClick={() => dispatch(removeHabit({ id: habit.id }))}
                                startIcon={<Delete/>}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{mt:2}}>
                        <Typography variant="body2">
                                    currentStreak :{getStreak(habit)} days
                        </Typography>
                        <LinearProgress variant="determinate" 
                        value={(getStreak(habit)/30) * 100}
                        sx={{mt:1 }}

                        />

                    </Box>
                </Paper>
            )
        })}
       </Box>
    )
}

export default HabitList; 