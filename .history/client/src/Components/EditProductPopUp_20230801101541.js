import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/EditProductPopUp.css';


function EditProductPopUp({closeModal, showEditModal, id}) {

  const[product, setProduct]=useState({
    companyName:'',
    category : [], 
    logoURL : '',  
    productLink : '', 
    description : '', 
  });

  useEffect(() => {
    axios.get(`https://product-portal-rnaz.onrender.com/get-prod-desc/${id}`) 
      .then(res => {
        console.log(res.data);
        setProduct({
          companyName: res.data.product.companyName,
          category: res.data.product.category,
          logoURL: res.data.product.logoURL,
          description: res.data.product.description,
          productLink: res.data.product.productLink,
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    
    const { name, value } = event.target;
  
    if (name === 'category') {
      const catsArray = value.split(',').map((cat) => cat.trim());
      setProduct({
        ...product,
        [name]: catsArray,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };
  const handleEditProd = (event) => {
    event.preventDefault();
    axios
      .patch(`https://product-portal-rnaz.onrender.com/edit-prods/${id}`, product)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
  return (
    <div className="edit-popup-container">
      <header className="edit-popup-header">
        
        {showEditModal && (
          <div className="modal-edit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}>
            <div className="modal-edit-content" onClick={handleClickInside}>
              
              <div className="modal-edit-body">
             
              <form className='modal-edit-body-left'>
              <h2>edit your product </h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="companyName" value={product.companyName} onChange={handleChange} placeholder="Name of the company"/>
                </div>

                

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="logoURL" value={product.logoURL} onChange={handleChange} placeholder="edit logo url" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="productLink" value={product.productLink} onChange={handleChange} placeholder="Link of Product" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="edit description" />
                </div>

                
                <div style={{width:'85%'}}>
                  <button className='edit-popup-button' type="submit" style={{ cursor:'pointer'}} onClick={handleEditProd}>Edit</button>
                </div>

              </form>
                <div className="modal-edit-body-right">
                  <h1 style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>edit your product and rate other items.............</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default EditProductPopUp