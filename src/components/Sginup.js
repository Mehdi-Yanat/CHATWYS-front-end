import React, {  useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import instance from '../axios'
import "./signup.scss"
function Signup() {
    let history = useHistory()
    const [AllData , setAllData] = useState({
        username:'',
        email:'',
        age:'',
        phone:'',
        password:'',
        confirmPassword:''
    })
    const [errMSG , setErrMSG] = useState('')
    const SumbitDataToDB = async (e)=>{
        e.preventDefault()
        
         await instance.post('/users/signup' , AllData).then((res)=>{
             console.log(res);
             
                    const interval = setInterval( async ()=>{
                        await history.push('/email-verification')
                      } , 2000)
                      setErrMSG("Sign up Successfully");
                      localStorage.setItem('authToken' , res.data.token)
                      return async ()=> await clearInterval(interval)
                
         }).catch((err)=>{
             console.log(err);
             setErrMSG("Please Check your information");
         })
       
    }
   useEffect(()=>{
    if (AllData.password !== AllData.confirmPassword) {
        setErrMSG("Password Doesn't Matches")
    }else if (AllData.password === "" && AllData.confirmPassword === "") {
        setErrMSG('')
    }else if (AllData.password.length < 8 || AllData.confirmPassword.length < 8 ) {
        setErrMSG("the password must have 8 characters")
    }
    else{
        setErrMSG('Password Matches')
    }
   },[AllData])
  
    const GatherInfo = (e) => {
        const {name , value} = e.target
        setAllData((preValue)=>{
            return{
                ...preValue ,
                [name]:value
            }
        })
     
    }
    

    return (
        <div className="Signup-page">
        <div className="circle"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <form onSubmit={SumbitDataToDB} className="form">
            <div >
            <input type="text" name="username" placeholder="Full Name"onChange={GatherInfo} value={AllData.username} />    
           <input type='email' key='email'  placeholder='Email' onChange={GatherInfo} name="email" value={AllData.email}/>   
            <input type="number" key="age" placeholder="age" onChange={GatherInfo} name="age" value={AllData.age} />
            <input type="tel" key='phone' placeholder="phone" onChange={GatherInfo} name="phone" value={AllData.phone} />
            <input type="password" key='password'  placeholder='Password' onChange={GatherInfo} name="password" value={AllData.password}/>
            <input type="password" key='confirmPassword'  placeholder='Confirm Password' onChange={GatherInfo} name="confirmPassword" value={AllData.confirmPassword}/>
            <p className="errmsg">{errMSG}</p>
            <button > SIGN UP </button>
            </div>
        </form>
        <div className="sign-up">
            <h2>if you already have account</h2>
           <Link to="/Login"> <button>SIGN IN</button> </Link>
        </div>

    </div>
    )
}

export default Signup
