import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utlis/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom'

function OnlyNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN)
  return (
    user ?  <Navigate to ="/"/>: <Outlet/> 

  )
}
export default OnlyNotLoggedIn