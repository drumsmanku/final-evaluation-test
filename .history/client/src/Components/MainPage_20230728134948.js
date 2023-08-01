import React, {useState, useEffect} from 'react';
import '../CSS/MainPage.css';
import profile from'../Assets/profilepic.webp';
import img1 from '../Assets/frontphoto.png';
import axios from 'axios';

function MainPage() {
  const [categorySet, setCategorySet]=useState([])
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [products, setProdcts]=useState([])
  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);
  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  }
  const handleCategoryClick=(event)=>{
    const currentCat=event.target.value;
    if(!categorySet.includes(currentCat)){
      setCategorySet([...categorySet, event.target.value]);
    }
    else{
      setCategorySet(categorySet.filter(cat=>cat!=currentCat))
    }
    
  }

  useEffect(()=>{
    const category=categorySet
    axios.get(`http://localhost/4000/get-prods/category=${category.join(',')}`)
    .then((res)=>{setProdcts(res.data.products)})
    .catch(err=>console.log(err))

  }, [categorySet])
  
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
          <img src={img1} alt="" height={500} style={{marginLeft:'3rem'}}/>
          <div style={{display:'flex', flexDirection:'column', marginLeft:'2rem'}}>
              <h1 style={{maxWidth:'80%'}}> Add your products and give your valuable feedback</h1>
              <span style={{maxWidth:'75%', color:'#6A6A6A'}}>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</span>
          </div>
        </div>
      </div>
      <div className="main-bottom-container">
        <div className="bottom-left">
          <span style={{backgroundColor:'#36416A'}}>
            <h2>Feedback</h2>
            <h5>Apply Filter</h5>
          </span>
        </div>
        <div className="bottom-right">
          hey
        </div>
      </div>
    </div>
  )
}

export default MainPage