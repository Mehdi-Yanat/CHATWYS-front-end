import { Avatar } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import instance from '../../axios';
import './Profil.scss'



function Profil() {
 
    let history = useHistory()
    const [realName , setPersone] = useState([])
    const [avatar , setAvatar] = useState([])
    const [noAvatarFound , setNoAvatarFound] = useState()
    const [avatarBuffer , setAvatarBuffer] = useState()
    const [SelectFile , setSelectFile] = useState()
    const [IsInput , setIsInput] = useState(false)
    const [NewUpdate , setNewUpdate] = useState({
        username:'',
        password:'',
        email:'',
        phone:''
    })
    const [Card , setCards] = useState()


    useEffect(() => {
        const fetchData = async ()=>{
            const req = await instance.get('/tinder/card' )
                  
           const CardOwneer =  req.data?.map(card=> card.owner )
           setCards(CardOwneer?.includes(realName._id));
        }
        fetchData()
    }, [realName])


    
        useEffect(() => {
            async function GatherFromDB() {
                const req = await instance.get('/users/me')
                const id = req.data._id
                setPersone(req.data)

                const res = await instance.get('users/'+id+'/avatar' , {responseType:'arraybuffer'})
                setNoAvatarFound(res)
                let blob  = new Blob([res.data] , {type: res.headers['content-type']})
                let img = URL.createObjectURL(blob)
                setAvatar(img)
                
            }

            GatherFromDB()
        }, [])

    const sendata = {
        name:realName.username
    }
    function addTinderCard() {
        instance.post('/tinder/card' , sendata).then((res)=>{
            setAvatarBuffer('Add Card Successfully');
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
        })
    }
    function DeleteTinderCard() {
            instance.delete("/tinder/card/delete").then((res)=>{
                setAvatarBuffer("Delete card successfully");
                setTimeout(()=>{
                    window.location.reload()
                }, 2000)
            }) 
    }
        
    function SelectFileOnchange(event) {
        event.preventDefault()
        setSelectFile(event.target.files[0])
     }

      const  UploadAvatar =  (e) => {
         e.preventDefault()
         let data = new FormData()
         data.append('avatar' , SelectFile)
         const config = {
             headers:{
                'content-type': 'multipart/form-data'
             }
         }
        instance.post('/users/me/avatar' , data , config).then((res)=>{
            setAvatarBuffer("Image sended");
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
       }).catch((err)=>{
           console.log(err);
       })
            
    
    }
    const DeleteAvatar = (e)=>{
        e.preventDefault()
        instance.delete('/users/me/avatar').then((res) => {
            setAvatarBuffer("Deleted avatar successfully");
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
        })
    }
    const GatherInfoo = (e)=>{
        e.preventDefault()
        const {name , value} = e.target
        setNewUpdate(preValue =>{
            return{
                ...preValue ,
                [name] : value
            }
        });
    }
    const UpdateFunc =(e)=>{
        e.preventDefault()
        setIsInput(preValue => !preValue)
       
    }
    const SumbitModifcation = (e)=>{
        e.preventDefault()
        const id = realName._id
        instance.patch('/users/'+id, NewUpdate).then((res)=>{
            setAvatarBuffer("Update successfully");
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
        }).catch((error)=>{
            console.log(error);
        })

    }
    
    if (!localStorage.authToken) {
        history.push('/login')
    }
    
    const logoutHundler = ()=>{
         localStorage.removeItem('authToken')
         history.push('/login')
    };

 

    return  (
       
        <div className="Profile mobileprofile">
            <div className="hamdi">
                <div className="profile-pic">
                <Avatar src={noAvatarFound ? avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy9MzI8YXc-v9nsSWVkgMaRTexZqdmtRsjg&usqp=CAU"} alt="hamid" className="addBoxShadow" sx={{ width: 200, height:200 }} > </Avatar>
                <label htmlFor="import-ph" className="import-photo" > Select Your New Photo </label>
                <input className="import-photo" id="import-ph" type='file' onChange={SelectFileOnchange}  />
                {SelectFile ? <button onClick={UploadAvatar}  >Upload New Photo</button> : ""}
                {noAvatarFound ? <button onClick={DeleteAvatar}  >Delete Photo</button> : ""}
                </div>
                <form onSubmit={SumbitModifcation} className="box-info">
                    <div className="box-info-1">
                    <h3>Name:</h3>

                    {!IsInput ? <h3>{realName.username}</h3> : <input onChange={GatherInfoo} type="text" placeholder="Update Name" name='username' value={NewUpdate.username}/>}
                    </div>
                    <div className="box-info-1">
                    <h3>Password:</h3>
                    {!IsInput ? <h3 type="password" >*****</h3> : <input onChange={GatherInfoo} type="password" placeholder="Update Password" name="password" value={NewUpdate.password} />}
                    </div>
                    <div className="box-info-1">
                    <h3>Email:</h3>
                    {!IsInput ? <h3>{realName.email}</h3> : <input onChange={GatherInfoo} type="email" placeholder="Update Email" name="email" value={NewUpdate.email} />}
                    </div> 
                    <div className="box-info-1">
                    <h3>Phone:</h3>
                    {!IsInput ?<h3>{realName.phone}</h3> : <input onChange={GatherInfoo} type='tel' placeholder="Update Phone" name="phone" value={NewUpdate.phone} />}
                    </div>
                    {!IsInput ? "" : <button  >Submit</button>}
                </form>
                
                    
                <div className="gap">
                    <button type="submit" onClick={logoutHundler} value={IsInput} >LOG OUT</button> 
                    {!IsInput ? <button onClick={UpdateFunc}>Update</button> :<button onClick={UpdateFunc}>Cancel</button>}
                    {noAvatarFound && !Card ?<button onClick={addTinderCard}>Add TinderCard</button> : ""}
                    {noAvatarFound && Card ? <button onClick={DeleteTinderCard}>Delete TinderCard</button> : ""}
                    <p>{avatarBuffer}</p>
                </div>
            </div>
            <div>
            
            </div>
            
         
        </div>
       
    )
}

export default Profil
