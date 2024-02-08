import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NullPage from './pages/NullPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NullPage status={"404"}/>}/>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='login' element={<LoginPage />}/>
        <Route path='/' element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
