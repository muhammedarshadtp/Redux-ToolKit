import { Provider } from 'react-redux'
import './App.css'
import { Container, Typography } from '@mui/material'
import store from './store/Store'
import AddHabits from './components/addHabits'
import HabitList from './components/HabitList'
import HabitStats from './components/HabitsStats'


function App() {
  

  return (
    <Provider store={store}>
    <Container maxWidth="md">
      <Typography component="h1" variant='h2' align='center'>
      Habit Tracker 
      </Typography>
      <AddHabits/>
    <HabitList/>
    <HabitStats/>
    </Container>
    
    </Provider>
  )
}

export default App
