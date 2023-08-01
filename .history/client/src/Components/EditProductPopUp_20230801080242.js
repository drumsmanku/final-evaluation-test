import React from 'react'

function EditProductPopUp({closeModal, showEditModal}) {
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
                  <button className='edit-popup-button' type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>edit+</button>
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