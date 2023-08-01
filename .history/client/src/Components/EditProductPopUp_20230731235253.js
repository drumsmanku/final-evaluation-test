import React from 'react'

function EditProductPopUp() {
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
                  <input type="text" name="companyName" value={product.companyName} onChange={handleChange} placeholder="Name of the company"/>
                </div>

                

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="logoURL" value={product.logoURL} onChange={handleChange} placeholder="Add logo url" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="productLink" value={product.productLink} onChange={handleChange} placeholder="Link of Product" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Add description" />
                </div>

                
                <div style={{width:'85%'}}>
                  <button className='add-popup-button' type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>Add+</button>
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

export default EditProductPopUp