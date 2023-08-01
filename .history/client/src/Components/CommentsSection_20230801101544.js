import React, { useState, useEffect } from 'react';
import axios from 'axios';
import send from '../Assets/send.png';

const buttonStyles={
  background:'none',
  border:'none', 
  outline:'none',
  cursor:'pointer',
  marginTop:'0.3rem'
}
const wrapperStyles={
  display:"flex",
  border:'3px solid #C7CBD6',
  borderRadius:'3rem',
  height:'2.8rem',
  width:'93%',
  backgroundColor:'#FFFFFF',
}
const inputStyles={
  width:'94%',
  paddingLeft:'1rem',
  background:'none',
  outline:'none',
  fontSize:'large',
  border:'none',

}
const bulletStyle = {
  listStyle: 'none',
  padding: '0', 
  overflow: 'auto',
  maxHeight:'8rem',
  scrollbarWidth: 'thin', 
  scrollbarColor: 'red yellow', 
};

const bulletPointStyle = {
  display: 'inline-block', 
  width: '0.7rem', 
  borderRadius: '100%',
  height: '0.7rem',
  backgroundColor: '#36416A', 
  marginRight: '1rem',
};
const CommentsSection = ({ productId , updateCommentCount}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(()=>{
    axios.get(`https://product-portal-rnaz.onrender.com/get-comments/${productId}`)
    .then(res => {
        setComments(res.data.comments);
        updateCommentCount(res.data.comments.length);
    })
    .catch(err => console.log(err));
  }, [productId]);

  const handleCommentSubmit = () => {
    axios.post(`https://product-portal-rnaz.onrender.com/add-comment`, {
        productId,
        text: newComment,
    })
    .then(res => {
        setComments([res.data.comment,...comments ]);
        setNewComment('');
        
        window.location.reload()
    })
    .catch(err => console.log(err));
  }



  return (
    <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:"column", color:'#999999'}}>
      <div style={{...wrapperStyles}} className='wrapper'>
        <input style={{...inputStyles}} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Add a comment....' />
        <button style={{...buttonStyles}} onClick={handleCommentSubmit}><img src={send} alt="" height={20}/></button>
      </div>
      <div style={{width:'93%'}}> 
      <ul style={{...bulletStyle}}>
        {comments.map((comment, index) => <li style={{marginBottom:'1.5rem', maxWidth:""}} key={index}><span style={bulletPointStyle}></span>{comment.text}</li>)}
      </ul>
        
      </div>
      
      
    </div>
  )
}

export default CommentsSection;
