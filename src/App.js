import logo from './logo.svg';
import './App.css';
import ScreenRecorder from './ScreenRecorder';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Navbar';
import LogIn from './LogIn';
import SignUp from './SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ScreenRecorder/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
