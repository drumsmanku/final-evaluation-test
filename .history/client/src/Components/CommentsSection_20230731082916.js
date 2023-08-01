import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsSection = ({ productId, setIsVisible, isVisible }) => {
  
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

  if (!isVisible) return <button onClick={setIsVisible(true)}>Comment</button>;

  return (
    <div>
      {comments.map((comment, index) => <p key={index}>{comment.text}</p>)}
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
      <button onClick={setIsVisible(false)}>Close Comment section</button>
    </div>
  )
}

export default CommentsSection;
