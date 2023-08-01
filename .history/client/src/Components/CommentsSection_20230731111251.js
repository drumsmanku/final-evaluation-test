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
}
const inputStyles={
  width:'95%',

}

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
    <div>
      <div style={{...wrapperStyles}} className='wrapper'>
        <input style={{...inputStyles}} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button style={{...buttonStyles}} onClick={handleCommentSubmit}><img src={send} alt="" /></button>
      </div>
      
      {comments.map((comment, index) => <p key={index}>{comment.text}</p>)}
      
    </div>
  )
}

export default CommentsSection;
