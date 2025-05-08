import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true
 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn ,setIsLoggedIn] = useState(false)
    const [userData ,setUserData] = useState(false)



    const getAuthState = async () => {
        try {
          const { data } = await axios.get(backendUrl + '/api/auth/is-auth', {
            withCredentials: true,
          });
      
          
          if (data.success) {
            setIsLoggedIn(true); 
            getUserData();
          } else {
            setIsLoggedIn(false); 
          }
        } catch (error) {
          console.log("is-auth", error);

          if (error.response && error.response.status === 400) {
           
            setIsLoggedIn(false); 
          } else {
         
            toast.error(error.response?.data?.message || "Something went wrong");
          }
        }
      };
      

 

    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data',{
              withCredentials: true,
            })
            console.log("sadfasdf",data );
            
            
            data.success ? setUserData(data.userData) : toast.error(data.message)
            console.log("check",data.userData);
        } catch (error) {
            //  toast.error(error.message)
          toast.error(error.response?.data?.message || error.message);
          console.log("getUserData error",error);
          

            
        }
    }

    //    useEffect(()=>{
    //     getAuthState()

    // },[])

    const value ={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData

    }

    return(
        <AppContext.Provider value={value}> 
            {props.children}
        </AppContext.Provider>
    )

}