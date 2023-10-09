import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Memo from './pages/Memo';


function App() {
  const theme = createTheme({
    palette: {
      primary:blue
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="memo" element={<Home/>}/>
          <Route path="memo/:memoId" element={<Memo/>}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
