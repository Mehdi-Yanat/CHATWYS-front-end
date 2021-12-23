import React, { useEffect } from 'react'
import './NavBar.scss'
import IconButton from '@mui/material/IconButton';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import {
    Link
  } from "react-router-dom";

function NavBar(props){

    
   
    return (<div className="nav">
        <div >
            <IconButton >
            <Link to="/Profile"   > <PersonIcon fontSize="large" className="header__icon"/> </Link>
            </IconButton>
        </div>
        <div >
            <IconButton >
            <Link to="/" > <img src='./logo.svg' alt="logo" /> </Link>
            </IconButton>
        </div>
        <div  >
            <IconButton className='pos'>
            <Link to="/Chat"  > <ChatBubbleIcon fontSize="large" className="header__icon"/> </Link>
            <div   className={props.reciveChat?.length ? 'msg' : "msgDiplay"}>
               {props.reciveChat?.length}
            </div>
            </IconButton>
        </div>
    </div>

    )
    
}


export default NavBar