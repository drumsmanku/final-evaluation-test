import React, {useState, useEffect} from 'react';
import '../CSS/SignUp.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import name from '../Assets/name.png'
import mobile from '../Assets/mobile.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'

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
        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={name} height={25} alt="" />
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name"/>
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={email} height={25} alt="" />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={mobile} height={25} alt="" />
          <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" />
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          <img src={password} height={25} alt="" />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
        </div>
        
        <span style={{}}>Already have an account? <button style={{background:'none', color:'black', fontSize:'medium', marginLeft:0, padding:0, width:'5rem', cursor:'pointer'}} onClick={()=>{navigate('/login')}}>Sign In</button></span>
        
        
         
        <button type="submit" style={{ cursor:'pointer'}} onClick={signup} >Create Account</button>

      </form>
    </div>
  )
}

export default SignUp