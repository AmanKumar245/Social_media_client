import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import {axiosClient} from '../../utlis/axiosClient';
import { KEY_ACCESS_TOKEN,  setItem } from '../../utlis/localStorageManager';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

   async function handleSubmit(e){
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
       password
     });
   
       console.log('Login result:', response);
    setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
    navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  
  
  return (
    <div className='Login'>
     <div className="login-form__header">
        <h1 className="login-form__header__title">Welcome to Share Memo</h1>
        <p className="login-form__header__text">Join our community and connect with friends, share your moments, and stay updated with the latest trends. Sign in to explore a world of endless possibilities and fun! </p>
      </div>
        <div className="login-Box">
            <h2 className="heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" >Email: </label>
                <input type="email" className='email' id='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password" >Password: </label>
                <input type="password" className='password' id='password' onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" className='submit'  onClick={handleSubmit}/>
            </form>
            <p className='subheading'>Do not have a account ? <Link to= '/Signup'>Sign up</Link></p>
        </div>
    </div>
  )
}

export default Login
