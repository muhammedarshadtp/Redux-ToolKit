import { Provider } from 'react-redux'
import './App.css'
import { Container, Typography } from '@mui/material'
import store from './store/Store'
import AddHabits from './components/addHabits'


function App() {
  

  return (
    <Provider store={store}>
    <Container sx={{ width: '60%' }}>
      <Typography component="h1" variant='h2' align='center'>
      Habit Tracker 
      </Typography>
    </Container>
    <AddHabits/>
    </Provider>
  )
}

export default App
