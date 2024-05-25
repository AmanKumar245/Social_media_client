
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import {Outlet} from "react-router"
import { useEffect } from 'react';
import { getMyInfo } from '../../redux/slices/appConfigSlice';


function Home() {
  
  const dispatch = useDispatch();

  
  //Fetch user info when the component is first loaded.
   useEffect(() => {
      dispatch(getMyInfo());

   },[dispatch]);
 

  return (
    <>
    <Navbar/>
   <div className="outlet" style={{marginTop:'60px'}}>
   <Outlet/>
   </div>
    
      
    </>
  )
}

export default Home;