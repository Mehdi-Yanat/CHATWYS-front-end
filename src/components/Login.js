import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import instance from '../axios'
import "./login.scss"
function Login() {

    let history = useHistory()
    const [LoginInfo , setLoginInfo]=useState({
        email:'',
        password:''
    })
    const GatherIputs = async (e)=>{
        e.preventDefault()
        const {name , value} = e.target
        setLoginInfo((preValue)=>{
            return {
            ...preValue ,
            [name]:value
            }
        })
    }

    const [errMsg , setError ]=useState('')

    const SubmitInfo = async (e) =>{
        e.preventDefault()
       await instance.post('/users/login' , LoginInfo).then((response)=>{
            const interval =  setInterval( async ()=>{ 
                await history.push('/')
              },2000)
            setInterval(()=>{
                window.location.reload()
            }, 3000)
              setError('sign in successfully')
              localStorage.setItem('authToken' , response.data.token)
              return  ()=>   clearInterval(interval)
          }).catch((error)=>{
             if (error.response) {
             const interval =  setInterval( async()=>{
                  await setError("Please check your information")
              } , 3000)
              return  ()=>  clearInterval(interval)
             }
        })
        
}
   
   
   
    
    return (
        <div className="Login-page">
            <div className="circle"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
            <form onSubmit={SubmitInfo} className="form">
               <input type='email' key='email'  placeholder='Email' onChange={GatherIputs} name="email" value={LoginInfo.email}>
                                     
                </input>
                <input type="password" key='password'  placeholder='Password' onChange={GatherIputs} name="password" value={LoginInfo.password}>
                </input>
                <p className="errmsg">{errMsg}</p>
                <button > SIGN IN </button>
               
            </form>
            <div className="sign-up">
                <h2>if you are a new one sign up </h2>
               <Link to="/Signup"> <button>SIGN UP</button> </Link>
            </div>

        </div>
    )
}

export default Login
