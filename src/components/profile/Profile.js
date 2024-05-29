import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './Profile.scss'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/PostSlice'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

function Profile() {
  const navigate =useNavigate();
  const params = useParams();
  const userProfile = useSelector(state =>state.postsReducer.userProfile);
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  console.log('profile from profile', userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
console.log('profile data my profile',myProfile)
  const dispatch = useDispatch();


  const [ismyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(()=>{
    dispatch(getUserProfile({
      userId:params.userId
    }))
setIsMyProfile(myProfile?._id === params.userId);
setIsFollowing(feedData?.followings?.find(item => item._id === params.userId))

  },[myProfile, params.userId,feedData,dispatch]);

  function handleUserFollow(){
    dispatch(followAndUnfollowUser({
      userIdToFollow: params.userId,
    }))

  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
        { ismyProfile && <CreatePost/>}
        {userProfile?.posts?.map(post => <Post key={post._id}  post={(post)}/>)}
      
        </div>
        <div className="right-part">
       <div className="profile-card">
        <img className='user-img' src={userProfile?.avatar?.url} alt="user img"  />
        <h3 className="user-name">{userProfile?.name}</h3>
        <p>{userProfile?.bio} </p>
        <div className="follower-info">
          <h4>{`${userProfile?.followers.length} follower`}</h4> 
           <h4>{`${userProfile?.followings.length} following`}</h4>
        </div>
        {!ismyProfile &&<h5 onClick={handleUserFollow}
    className= {isFollowing ? 'hover-link follow-link' : 'btn-primary' } 
    > {isFollowing ? 'Unfollow' : 'Follow'} </h5>}
        {ismyProfile && <button className='update-profile btn-secondary' onClick={ () => {navigate('/UpdateProfile')}} >Update Profile</button>}
 

       </div>

        </div>
      </div> 
    </div>
  )
}

export default Profile
