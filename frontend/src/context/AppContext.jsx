import { createContext, useEffect, useState } from "react";
import {doctors} from "../assets/assets"
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext=createContext()

const AppContextProvider=(props)=>{

  const currencySymbol='$'
  const backendUrl=import.meta.env.VITE_BACKEND_URL 
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData ,setUserData]=useState(false)


   

  const loadUserProfileData= async()=>{

    try{
       const {data}=await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})

       if(data.success)
       {
        console.log(data.userData)
        setUserData(data.userData)
       }
       else
       {
        toast.error(data.messasge)
       }
    }
    catch(error)  
    {
      console.log(error)
      toast.error(error.messasge)
    }
    
  }

  const value={
    doctors,currencySymbol,
    token,setToken,
    backendUrl,userData,setUserData,loadUserProfileData
}

  useEffect(()=>{
    if(token)
    {
      console.log("inside if token")
      loadUserProfileData()
    }
    else
    {
      setUserData(false)
    }
  },[token])

   return(
    <AppContext.Provider value={value}>
         {props.children}
    </AppContext.Provider>
   )
    
}
export default AppContextProvider