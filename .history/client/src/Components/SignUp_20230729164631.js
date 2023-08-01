import React, {useState, useEffect} from 'react';
import '../CSS/SignUp.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const signup = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/signup', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/')
        }
        else{
          
        }
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='signup-container'>
      <div className="headings">
        <h1>Feedback</h1>
        <span>Add your products and give us your valuable feedback</span>
      </div>
      <form>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name"/>
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" />
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />  
        <button type="submit" style={{ cursor:'pointer'}} onClick={signup} >Create Account</button>

      </form>
    </div>
  )
}

export default SignUp