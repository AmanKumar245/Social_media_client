import React, { } from 'react'
import './Navbar.scss'
import { IoIosLogOut } from "react-icons/io";
import Avatar from '../avatar/Avatar'
 import {  useSelector } from 'react-redux';
 import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utlis/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utlis/localStorageManager';

function Navbar() {

  const navigate = useNavigate();
  
  const myProfile = useSelector(state => state.appConfigReducer.myProfile)

 async function handleLogoutClicked(){
    try {
      await axiosClient.post('/auth/logout');
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')      
    } catch (error) {
      
    }

  }

  return (
    <div className="Navbar">
      <div className="container">
        <h2 className="banner hover-link" 
        onClick = {()=>navigate("/")}>
        Social Media
        </h2>
        <div className="right-side">
        <div 
        className="profile hover-link"
         onClick = {()=> navigate(`/profile/${myProfile?._id}` )}>
        
          <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="logout hover-link" onClick={handleLogoutClicked} >
        <IoIosLogOut />

        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar