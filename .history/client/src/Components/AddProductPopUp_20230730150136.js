import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddProductPopUp.css';
import axios from 'axios';
import name from '../Assets/name.png'
import mobile from '../Assets/mobile.png'
import email from '../Assets/email.png'
import password from '../Assets/password.png'

function AddProductPopUp({ closeModal, showAddModal }) {
  const navigate = useNavigate();
  const[product, setProduct]=useState({
    companyName:'',
    category : [], 
    logoURL : '',  
    productLink : '', 
    description : '', 
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'category') {
      const categoryArray = value.split(',').map((cat) => cat.trim());
      setProduct({
        ...product,
        [name]: categoryArray,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };
  const sendProd = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/create-prod', product, {
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(res => {
        navigate('/success')
      })
      .catch(err => console.log(err));
  };

  
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
  return (
    <div className="add-popup-container">
      <header className="add-popup-header">
        
        {showAddModal && (
          <div className="modal-add" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}>
            <div className="modal-add-content" onClick={handleClickInside}>
              
              <div className="modal-add-body">
             
              <form className='modal-add-body-left'>
              <h2>Add your product </h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={email} height={25} alt="" />
                  <input type="text" name="companyName" value={product.companyName} onChange={handleChange} placeholder="Name of the company"/>
                </div>

                

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={password} height={25} alt="" />
                  <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" />
                </div>
                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={password} height={25} alt="" />
                  <input type="text" name="logoURL" value={product.logoURL} onChange={handleChange} placeholder="Add logo url" />
                </div>
                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={password} height={25} alt="" />
                  <input type="text" name="productLink" value={product.productLink} onChange={handleChange} placeholder="Link of Product" />
                </div>
                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <img src={password} height={25} alt="" />
                  <input type="text" name="productLink" value={product.description} onChange={handleChange} placeholder="Add description" />
                </div>

                
                <div style={{width:'85%'}}>
                  <button className='sadd-button' type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>Add+</button>
                </div>

              </form>
                <div className="modal-add-body-right">
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

export default AddProductPopUp