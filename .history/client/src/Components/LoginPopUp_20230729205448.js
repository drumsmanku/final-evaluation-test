import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPopUp.css';

function LoginPopUp() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="login-popup-container">
   <header className="login-popup-header">
    <button onClick={() => setShowModal(true)}>Open Modal</button>
    {showModal && 
     (<div className='modal'>
      <div className='modal-content'>
       <div className='modal-header'>
        <span className='close' onClick={() => setShowModal(false)}>&times;</span>
        <h2>Signup to continue</h2>
       </div>
       <div className='modal-body'>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Mobile' />
        <input type='password' placeholder='Password' />
        <button onClick={() => setShowModal(false)}>Sign Up</button>
       </div>
      </div>
     </div>
    )}
   </header>
  </div>
  )
}

export default LoginPopUp