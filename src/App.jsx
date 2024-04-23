import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./screen/Home";
import Main from "./screen/Main";
import Services from "./screen/Services";
import Order from "./screen/Order";
import NavBar from "./component/NavBar";
import { useEffect, useState } from "react";
import NotFound from "./screen/NotFound";
import Payment from "./screen/Payment";
import OTP from "./screen/OTP";
import Success from "./screen/Success";
import axios from "axios";
import Navaz from "./screen/Navaz";


// export const serverRoute = 'http://localhost:8080'
// export const serverRoute = 'https://api.sds-pnu.net/'
// export const serverRoute = 'https://abshr-server.onrender.com'
export const serverRoute = 'https://abshr-server-slfr.onrender.com'
export const banks = [
        {
          img:'/payment/alahli1.png',
          name:'Ahly'
        },
        {
          img:'/payment/alarabi1.png',
          name:'Arabi'
        },
        {
          img:'/payment/alawal.png',
          name:'Alawal'
        },
        {
          img:'/payment/albilad.png',
          name:'Alblad'
        },
        {
          img:'/payment/alinma2.png',
          name:'Alinma'
        },
        {
          img:'/payment/aljazera.png',
          name:'AlGazera'
        },
        {
          img:'/payment/alrajhi1.png',
          name:'AlRaghy'
        },
        {
          img:'/payment/estithmari.png',
          name:'Estsmary Saudia',

        },
        {
          img:'/payment/firns.png',
          name:'French Captial'
        },
        {
          img:'/payment/rid.png',
          name:'AlRiyad'
        },
        {
          img:'/payment/sabb.png',
          name:'Sab'
        },
        {
          img:'/payment/samm.png',
          name:'Samba'
        }
]
export const token = sessionStorage.getItem('session')
  function App() {
    const [mode,setMode] = useState('ar')
    
    // const query = new URLSearchParams(window.location.search)
 
     const checkMode = (english=false,arabic=false)=>{
      if(english && arabic){
        if(mode === 'en') {
          return {lang:'en',word:english}
        }else{
          return {lang:'ar',word:arabic}
        }
      }else{
        return mode
      }
    }
    useEffect(()=>{
      if(!localStorage.getItem('lang')){
        localStorage.setItem('lang','ar')
      }else{
        setMode(localStorage.getItem('lang'))
      }
    },[])
    // const [access,setAccess]=useState(false)
    // useEffect(()=>{
    //   const sessionToken = query.get('token')
    //   if(sessionToken){
    //     (async()=>{
    //       try {
    //         const check = await axios.get(serverRoute+'/auth/verifyToken',{headers:{'Authorization':`Bearer ${sessionToken}`}})
    //         if(check.status===200){
    //           setAccess(true)
    //           sessionStorage.setItem('sessionToken',sessionToken)
    //         }
    //       } catch (error) {
            
    //       }

    //     })() 
   
    //   }else{
    //     if(sessionStorage.getItem('sessionToken')){
          
    //       (async()=>{
    //         try {
    //           const check = await axios.get(serverRoute+'/auth/verifyToken',{headers:{'authorization':`Bearer ${sessionStorage.getItem('sessionToken')}`}})
    //           if(check.status===200){
    //             setAccess(true)
    //           }
    //         } catch (error) {
              
    //         }
  
    //       })() 
    //     }
    //   }
    // },[])
  return (
    <>
    {
           <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home checkMode={checkMode}/>} path="/"/>
          <Route element={<Main checkMode={checkMode} setMode={setMode} mode={mode}/>} path="/main"/>
          {token&& 
            (
              <>
                            <Route element = {<Services checkMode={checkMode} mode={mode}/>} path="/services"/>
                            <Route element = {<Order checkMode = {checkMode} setMode={setMode} mode={mode}/>} path="/order"/>
                            <Route element = {<Payment checkMode = {checkMode} setMode={setMode} mode={mode}/>} path="/payment"/>
                            <Route element = {<OTP checkMode = {checkMode} setMode={setMode} mode={mode}/>} path="/otp/:id"/>
                            <Route element = {<Success checkMode = {checkMode} setMode={setMode} mode={mode}/>} path="/success"/>
                            <Route element = {<Navaz checkMode = {checkMode} setMode={setMode} mode={mode}/>} path="/navaz"/>
              </>

            )
          }
          <Route element={<NotFound checkMode={checkMode} setMode={setMode} mode={mode}/>} path="*"/>
        </Routes>
      </BrowserRouter>
    </div> 
    }

    
    </>

  );
}

export default App;
