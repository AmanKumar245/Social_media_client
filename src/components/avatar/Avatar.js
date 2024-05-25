import React from 'react'
import userImg from '../../Assets/avatar.jpg'
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src? src :userImg} alt="Avatart" />
    </div>
  )
}

export default Avatar