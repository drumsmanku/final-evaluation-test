import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPopUp.css';
import axios from 'axios';
import name from '../Assets/name.png'
import mobile from '../Assets/mobile.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'

function LoginPopUp() {
  const [showModal, setShowModal] = useState(false);
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
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="login-popup-container">
      <header className="login-popup-header">
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal && (
          <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <h2>Signup to continue</h2>
              </div>
              <div className="modal-body">
              <form className='modal-body-left'>
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

                <span style={{color:'#737373'}}>Already have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{navigate('/login')}}>Log In</button></span>
                
                <div style={{width:'85%', textAlign:'end'}}>
                  <button className='signup-button' type="submit" style={{ cursor:'pointer'}} onClick={signup}>Sign up</button>
                </div>

              </form>
                <div className="modal-body-right">
                  
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