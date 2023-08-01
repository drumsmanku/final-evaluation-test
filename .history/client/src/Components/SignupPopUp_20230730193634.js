import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import name from '../Assets/name.png'
import mobile from '../Assets/mobile.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png';
import '../CSS/SignupPopUp.css'

function SignupPopUp({closeModal, showSignupModal, setShowLoginModal}) {
  
  const navigate=useNavigate();
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
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
          navigate('/');
          window.location.reload()
        }
        
      })
      .catch(err => console.log(err));
  };
 
  return (
    <div className="signup-popup-container">
      <header className="signup-popup-header">
        
        {showSignupModal && (
          <div className="modal-signup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}> 
            <div className="modal-content" onClick={handleClickInside}> 
              
              <div className="modal-body">
              <form className='modal-body-left'>
              <h2>Signup to continue</h2>
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

                <span style={{color:'#737373'}}>Already have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={() => setShowLoginModal(true)}>Log In</button></span>
                
                <div style={{width:'85%', }}>
                  <button className='signup-popup-button' type="submit" style={{ cursor:'pointer'}} onClick={signup}>Sign up</button>
                </div>

              </form>
                <div className="modal-body-right">
                  <h1 style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Add your product and rate other items.............</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default SignupPopUp