import React, { useEffect, useRef, useState } from 'react'
import instance from '../../axios'
import Converstions from '../conversations/Converstions'
import NavBar from '../Header/NavBar'
import Messages from '../messages/Messages'
import './Messenger.scss'
import Search from '../search/Search'
import {io}  from "socket.io-client"
import { useHistory } from 'react-router-dom'

const ENDPOINT = instance.defaults.baseURL

function Messenger() {
    let history = useHistory()
    const [converstaion , setConverstaions] = useState([])
    const [user , setUser] = useState({})
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState([])
    const [newMessage , setNewMessages] = useState("")
    const socket = useRef()
    const [searchUser , setSearchUser] = useState("")
    const [reslutSearch , setResult] = useState(null)
    const [MessageFromSocket , setMessageFromSocket] = useState(null)
    const [userIsOnline , setUserIsOnline] = useState()
    const scrollRef = useRef()

    if (!localStorage.getItem('authToken')) {
        history.push('/login')
    }

    useEffect(()=>{
        socket.current = io(ENDPOINT)   
        socket.current.on('getMessage' , (data) =>{
            setMessageFromSocket({
                sender:data.senderId,
                text:data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        MessageFromSocket && currentChat?.members.includes(MessageFromSocket.sender)&&
        setMessages(prev => [...prev , MessageFromSocket])
    },[MessageFromSocket , currentChat  ])

   useEffect(()=>{
    socket.current.emit('addUser' , user._id)
    socket.current.on("getUsers", users => {
        setUserIsOnline(users);
    })
   },[user])

    
   

    useEffect(() => {
        async function GatherFromDB() {
            const req = await instance.get('/users/me')
            setUser(req.data)

            const getConverstion  = await instance.get('/convs/'+user._id)
            setConverstaions(getConverstion.data);
        }
     
        GatherFromDB()
    }, [user._id])

    useEffect(()=>{
        const getMessages = async ()=>{
            try {
                const res = await instance.get('/message/'+currentChat?._id)
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    } , [currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior:"smooth" })
    }, [messages])

   
    const receiverId = currentChat?.members.find((m)=> m !== user._id)
    const submitHandler = async(e)=>{
        e.preventDefault()
        const message = {
            sender:user._id,
            text:newMessage,
            conversationId:currentChat,
            receiver:currentChat.members[1]
        }
        setNewMessages("")
        socket.current.emit('sendMessage' , {
            senderId:user._id,
            receiverId:receiverId,
            text:newMessage
        })

        try {
            const res = await instance.post("/message" , message)
            setMessages([...messages , res.data])
        } catch (error) {
            console.log(error);
        }

    }

    const searchingUser = async (e)=>{
        e.preventDefault()
        const res = await instance.get('/users?username='+searchUser)
        setResult(res.data);
    }

    const startChat = async (e)=>{
        const data = {
            senderId:user._id,
            receiverId:reslutSearch._id
        }
        e.preventDefault()
        await instance.post('/convs' ,data)
        await setInterval(()=>{
            window.location.reload()
        } , 1000)
        await setCurrentChat(currentChat)
        return
    }
    

    return (
        <div>
            <NavBar/>
            <div className="Profile">

                <div className="info-2" >

                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            <input placeholder="Search for friends" className="inpuSearch" onChange={e=>setSearchUser(e.target.value)} />
                            <button style={{marginTop:"10px"}} onClick={searchingUser} > Search </button>
                             {converstaion.map((c)=>(
                                <div style={{cursor:'pointer'}}  onClick={()=>{setCurrentChat(c)}} >
                                     <Converstions key={c._id} conversations={c} currentUser={user} sendCurrentChat={currentChat} userIsOnline={userIsOnline} />
                                </div>
                              ))}
                              <div  style={{ cursor:'pointer'}}  onClick={startChat} >
                                <Search reslutSearching={reslutSearch} />
                              </div>
                        </div>
                    </div>

                    <div className="chatBox">
                        <div className="chatBoxWrapper">

            
                    {currentChat ? 
                    <>
                    <div className="chatBoxTop">
                        
                        {messages.map(m=><div ref={scrollRef} > <Messages key={m._id} message={m} own={m.sender === user._id} memeber={receiverId}  UserId={user._id} /> </div>)}
                        
                    </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e)=>setNewMessages(e.target.value)}
                    value={newMessage}
                    ></textarea>
                  <button className="chatSubmitButton" onClick={submitHandler}  >
                    Send
                  </button>
                 </div>
                 </> : <span className="noConversationText" >Open New Chat</span>  
              } 
           
                 </div>
                </div>

                </div>
         
            </div>
        
        </div>
    )
}


export default Messenger
