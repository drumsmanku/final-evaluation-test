import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './Components/MainPage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
