import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login.css';
import email from '../Assets/email.png'
import password from '../Assets/password.png'

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
 
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const login = (event) => {
    event.preventDefault();
    axios.post('https://product-portal-rnaz.onrender.com/login', user)
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
    <div className='login-container'>
      <div className="login-headings">
        <h1>Feedback</h1>
        <span>Add your products and give us your valuable feedback</span>
      </div>
      <form>
        
        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={email} height={25} alt="" />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={password} height={25} alt="" />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
        </div>

        <span style={{color:'#737373'}}>Don’t have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{navigate('/signup')}}>Sign Up</button></span>
        
        <div style={{width:'85%', textAlign:'end'}}>
          <button className='login-button' type="submit" style={{ cursor:'pointer'}} onClick={login}>Login</button>
        </div>

      </form>
    </div>
  )
}

export default Login