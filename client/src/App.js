import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      primary:blue
    }
  })
  return (
<<<<<<< HEAD
    <div className="App">
      こんにちは
    </div>
=======
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
>>>>>>> secound
  );
}

export default App;
