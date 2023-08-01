import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPopUp.css';
import axios from 'axios';
import name from '../Assets/name.png'
import mobile from '../Assets/mobile.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'

function LoginPopUp({ closeModal, showLoginModal, setShowSignupModal }) {
  
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
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
    axios.post('http://localhost:4000/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/');
          window.location.reload()
        }
        else{
         
        }
        
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="login-popup-container">
      <header className="login-popup-header">
        
        {showLoginModal && (
          <div className="modal-login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}>
            <div className="modal-login-content" onClick={handleClickInside}>
              
              <div className="modal-login-body">
             
              <form className='modal-login-body-left'>
              <h2>Log in to continue</h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={email} height={25} alt="" />
                  <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
                </div>

                

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={password} height={25} alt="" />
                  <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                </div>

                <span style={{color:'#737373'}}>Don’t have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{closeModal(); setShowSignupModal(true)}}>Sign Up</button></span>
                
                <div style={{width:'85%'}}>
                  <button className='login-popup-button' type="submit" style={{ cursor:'pointer'}} onClick={login}>Log In</button>
                </div>

              </form>
                <div className="modal-login-body-right">
                  <h1 style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Add your product and rate other items.............</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default LoginPopUp