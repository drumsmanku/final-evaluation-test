import React, {useState, useEffect} from 'react';
import '../CSS/MainPage.css';
import profile from'../Assets/profilepic.webp';
import img1 from '../Assets/frontphoto.png'

function MainPage() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  });
  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  }

  
  return (
    <div className='main-container'>
      <div className="main-top-container">
        <div className='navbar' >
          <div style={{display:'flex',width:'100%', justifyContent:' space-between', alignItems:'center',}}>
          <h3 style={{marginLeft:'5rem', color:'white', fontSize:'1.5rem'}}>Feedback</h3>
          <div style={{display:'flex', marginRight:'5rem'}}>
              {isLoggedIn ? (
                <>
                  <button style={{background:'none', fontSize:'large', border:'none', fontFamily:'DM Sans', color:'white'}} onClick={handleLogout}>Logout</button>
                  <span style={{color:'white', fontFamily:'DM Sans', fontSize:'large', display:'flex', alignItems:'center', marginLeft:'1rem'}}>Hello!</span>
                  <img src={profile} alt="" height={50} width={50} style={{borderRadius:'100%', marginLeft:'1rem'}} />
                </>
              ) : (
                <>
                  <button className='btn-main-page-login' type='submit'  >Log in</button>
                  <button type='submit'  className='btn-main-page-register' >Sign up</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="title-desc">
          <img src={img1} alt="" />
        </div>
      </div>
      <div className="main-bottom-container"></div>
    </div>
  )
}

export default MainPage