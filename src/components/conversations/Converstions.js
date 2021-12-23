import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import './Converstions.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
function Converstions({sendCurrentChat , conversations , currentUser , userIsOnline }) {

    const [user , setUser] = useState(null)
    const [switchDelete  , setSwitch] = useState(true)
    const [userOnline , setUserOnline] = useState(false)

    useEffect(()=>{
        const friendId = conversations.members.find((m)=>m !== currentUser._id)
        const getUser = async ()=>{
            try {
            const res = await instance.get('/users?userId='+friendId)
            setUser(res.data);
            } catch (error) {
            console.log(error); 
            }
        }
        getUser()
    }, [currentUser , conversations])

    useEffect(()=>{
        const friendId = conversations.members.find((m)=>m !== currentUser._id)
        
        const friendOnline =   userIsOnline.map(user => user.userId === friendId)
        //console.log(friendOnline);
        const filtred = friendOnline.filter(user => user === true)
        if (filtred.length !== 0) {
            setUserOnline(true)
        }
        return
    }, [])


    const switchDeleteFunc = async ()=>{
        setSwitch(perValue => !perValue)
    }
    const DeleteFunc = async ()=>{
        const id = sendCurrentChat?._id
        const DeleteConversation = await instance.delete('/convs/'+id)
        console.log(DeleteConversation);
        await setInterval(()=>{
            window.location.reload()
        } , 1000)
        return
    }
    // `https://tinder-bacned.herokuapp.com/users/${user._id}/avatar` online backend
    // `http://localhost:8001/users/${user._id}/avatar`
    return (
      
        <div  className="conversations" onClick={switchDeleteFunc} >
                <div className='statusOnline'>
                <img className="conversationsImg" src={user?.avatar ? `https://tinder-bacned.herokuapp.com/users/${user._id}/avatar` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy9MzI8YXc-v9nsSWVkgMaRTexZqdmtRsjg&usqp=CAU" } alt="user" ></img>
               {userOnline && <FiberManualRecordIcon className="dot" />}
                </div>
            <span className="conversationsName">
                {user ? user.username : "no user"}
            </span>
           {switchDelete ? <span></span> : <CancelIcon onClick={DeleteFunc} className="conversationsIcone" src={user ? `https://tinder-bacned.herokuapp.com/users/${user._id}/avatar` : <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy9MzI8YXc-v9nsSWVkgMaRTexZqdmtRsjg&usqp=CAU"/> } alt="user" ></CancelIcon>}
        </div>
    
    )
}       

export default Converstions
