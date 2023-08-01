import React, { useState, useEffect } from 'react';
import axios from 'axios';
import send from '../Assets/send.png';

const buttonStyles={
  background:'none',
  border:'none', 
  outline:'none',
  cursor:'pointer',
}
const wrapperStyles={
  display:"flex",
  border:'3px solid #C7CBD6',
  borderRadius:'3rem',
  height:'2.8rem',
  width:'93%',
}
const inputStyles={
  width:'95%',

}
const bulletStyle = {
  listStyle: 'none', // Hide default bullet points
  padding: '0', // Remove any padding to align the custom bullet points properly
};

const bulletPointStyle = {
  display: 'inline-block', // To customize the bullet point independently
  width: '10px', // Change the size of the bullet point
  height: '10px',
  backgroundColor: 'blue', // Change the color of the bullet point
  marginRight: '5px', // Adjust the distance between the bullet point and the text
};
const CommentsSection = ({ productId, }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(()=>{
    axios.get(`http://localhost:4000/get-comments/${productId}`)
    .then(res => {
        setComments(res.data.comments);
    })
    .catch(err => console.log(err));
  }, [productId]);

  const handleCommentSubmit = () => {
    axios.post(`http://localhost:4000/add-comment`, {
        productId,
        text: newComment,
    })
    .then(res => {
        setComments([...comments, res.data.comment]);
        setNewComment('');
    })
    .catch(err => console.log(err));
  }



  return (
    <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:"column"}}>
      <div style={{...wrapperStyles}} className='wrapper'>
        <input style={{...inputStyles}} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button style={{...buttonStyles}} onClick={handleCommentSubmit}><img src={send} alt="" /></button>
      </div>
      <div style={{width:'93%'}}> 
      <ul style={{...bulletStyle}}>
        {comments.map((comment, index) => <li key={index}><span style={bulletPointStyle}></span>{comment.text}</li>)}
      </ul>
        
      </div>
      
      
    </div>
  )
}

export default CommentsSection;
