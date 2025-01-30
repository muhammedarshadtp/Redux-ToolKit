import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabits } from "../store/HabitSlice";
import { dispatch } from "../store/Store";


const AddHabits: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [Frequency, setFrequency] = useState<"daily" | "weekly">("daily")
    const dispatch = useDispatch<dispatch>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim()) {
            dispatch(
                addHabits({
                    name,
                    Frequency,
                })
            )
            setName("")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
                width: "100%",
            }} >
                <TextField
                    label="Habit Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the habits"
                    sx={{ width: '50%' }}
                />
                <FormControl sx={{ width: '50%' }}>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                        value={Frequency}
                        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}

                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '200px' }}>
                    Add Habits
                </Button>
            </Box>
        </form>
    )
}

export default AddHabits;