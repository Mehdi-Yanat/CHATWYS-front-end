import React from 'react'
import './Email.scss'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
function EmailVerfiction() {
    let history = useHistory()
 
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/Login')
        }
        const interval =  setInterval(()=>{
            window.location.reload()
                      
        } , 2000)
        return ()=>   clearInterval(interval)
    }, [history])
    return (
        <div className="Login-page">
        <div className="circle"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <div className="sign-up">
            <h2>We Have Send You An Email Check It </h2>
            <h2> Verify your email address as soon as possible </h2>
           <Link to="/" > <button  >GO TO HOME</button> </Link>
        </div>

    </div>
    )
}

export default EmailVerfiction
