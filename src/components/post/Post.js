import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import { useNavigate } from 'react-router-dom'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { likeAndUnlikePost } from '../../redux/slices/PostSlice';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';


function Post({post}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLike() {
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: "Post Liked Successfully",
    }))
    dispatch(likeAndUnlikePost({
      postId:post._id
    }))

  }


  return (
   <div className="Post">
    <div className="heading" onClick={()=> navigate(`/profile/${post.owner._id}`)}>

    <Avatar src={post.owner?.avatar?.url} />
    <h4>{post?.owner?.name}</h4>

    </div>
    <div className="content">
      <img src= {post?.image?.url} alt="backgroundImage"  />
    </div>
    <div className="footer">
    <div className="like" onClick={handlePostLike}>
    {post.isLiked ? <AiFillHeart style={{color:'red'}} className='icon'/>  : <AiOutlineHeart className='icon' />}
    <h4>{`${post.likesCount} Likes`}</h4>
    </div>
<p className='caption'>{post.caption}</p>    
<h6 className='time-ago'> {post?.timeAgo}</h6>
    </div>
   </div>
  )
}

export default Post