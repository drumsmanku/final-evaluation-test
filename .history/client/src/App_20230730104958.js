import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './Components/MainPage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
function App() {
  const timestamp = new Date().getTime();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage key={timestamp}/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
