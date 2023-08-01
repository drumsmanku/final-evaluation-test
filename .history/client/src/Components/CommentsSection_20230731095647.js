import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
      {comments.map((comment, index) => <p key={index}>{comment.text}</p>)}
      
    </div>
  )
}

export default CommentsSection;
