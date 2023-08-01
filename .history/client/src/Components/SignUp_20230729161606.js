import React from 'react';
import '../CSS/SignUp.css'

function SignUp() {
  return (
    <div className='signup-container'>
      <div className="headings">
        <h1>Feedback</h1>
        <span>Add your products and give us your valuable feedback</span>
      </div>
      <form>
          <div style={{marginLeft:'5rem'}}>
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
      
          </div>
          <button type='submit' style={{cursor:'pointer'}} onClick={login} >Login</button>
          <span style={{marginLeft:'5rem'}}>Don’t have an account? <button style={{background:'none', color:'black', fontSize:'medium', marginLeft:0, padding:0, width:'5rem', cursor:'pointer'}} onClick={()=>{navigate('/register')}}>Sign Up</button></span>
        </form>
    </div>
  )
}

export default SignUp