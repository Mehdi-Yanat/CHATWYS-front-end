import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import NavBar from './Header/NavBar'
import Main from './Main/Main'
import "./home.scss"
function Home() {
    const [sendToNav , setNav] = useState()
    
    let history = useHistory()
    if(!localStorage.authToken){
        history.push('/login')
    }
    

    return (
        <div className="Border" >
            <NavBar reciveChat={sendToNav} />
            <Main  sendToNav={setNav}/>
        </div>
    )
}

export default Home
