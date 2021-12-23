import "../../components/Footer/Footer.scss"
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import instance from '../../axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Footer({goBack  , CardOwner , PeopleCard , sendToNvaBar}) {
    const [userId , SetUserId] = useState()
    const [likeDislike , setLikeDislike] = useState(false)
    const [StarDiStar , setStarDiStar] = useState(false)
    const [FilterConvs , setFilterConvs] = useState()
    const [newConvs , setNewConvs] = useState([])

    useEffect(() => {
        async function GatherFromDB() {
            const req = await instance.get('/users/me')
            const id = req.data._id
            SetUserId(id)
        }

        GatherFromDB()
    }, [userId])

    useEffect(()=>{
          async  function  conversations () {
            const resConvs = await instance.get('/convs/'+userId)
            setFilterConvs(resConvs.data);
            sendToNvaBar(resConvs.data)
            }
            conversations()
            
    },[FilterConvs])
    /*
    useEffect(()=>{
        for (let i = 0; i < FilterConvs.length; i++) {
            const element = FilterConvs[i];
            console.log(element);
        }
    }, [])
*/


        
       
        const sendConvs = async  ()=>{
                    
                    const data ={
                        senderId:userId,
                        receiverId:CardOwner ? CardOwner.owner : PeopleCard.owner,
                    }
                    try {
                    const res = await instance.post('/convs' , data)
            
                     setNewConvs([newConvs , res.data.members])  
                    } catch (error) {
                        
                    }
                
            
        }
        
        const Heart = async(id)=>{
            setLikeDislike(preValue => !preValue)
            if (!likeDislike) {
                const ifisIncludes = CardOwner?.Hearts.filter(heart => heart?.includes(userId))
                if (!ifisIncludes?.includes(userId)) {
                    const res = await instance.put("/tinder/card/hearts" , {CardId:id})
                    console.log(res);
                }
                return
            }else{
                const res =  await instance.put("/tinder/card/disHeart" , {CardId:id})
                console.log(res);
            }              
        }
        const Stars = async(id)=>{
            setStarDiStar(preValue => !preValue)
            if (!StarDiStar) {
                const ifisIncludes = CardOwner?.Stars.filter(heart => heart?.includes(userId))
                if (!ifisIncludes?.includes(userId)) {
                    const res = await instance.put("/tinder/card/stars" , {CardId:id})
                    console.log(res);
                }
                return
            }else{
              
                const res =  await instance.put("/tinder/card/disStars" , {CardId:id})
                console.log(res);
            }
        }
        useEffect(()=>{
            const myFunc = ()=>{
                const ifisIncludes = CardOwner?.Stars.map(heart => heart?.includes(userId))
                if (ifisIncludes?.includes(true)) {
                    setStarDiStar(true)
                    return
                }else{
                    setStarDiStar(false)
                    return
                }
                
            }
            myFunc()
        }, [CardOwner])

        useEffect(()=>{
            const myFunc = ()=>{
                const ifisIncludes = CardOwner?.Hearts.map(heart => heart?.includes(userId))
                if (ifisIncludes?.includes(true)) {
                    setLikeDislike(true)
                    return
                }else{
                    setLikeDislike(false)
                    return
                }
                
            }
            myFunc()
        }, [CardOwner])

   
    return (
        <div className="footer">
            <IconButton>
            <div className="icon-1 mobile ">
                <ReplayIcon fontSize="large" onClick={()=>goBack()} className="replay"></ReplayIcon>
            </div> 
            </IconButton>
            <IconButton  onClick={()=> Heart(CardOwner !== undefined ? CardOwner._id : PeopleCard._id)}>
            <div className={!likeDislike ? "icon-1 " : "true "}>
                <FavoriteIcon fontSize="large" className="fav"></FavoriteIcon>
            </div> 
            </IconButton>
            <IconButton onClick={()=> Stars(CardOwner !== undefined  ? CardOwner._id : PeopleCard._id)} >
            <div className={!StarDiStar ? "icon-1 " : 'true '}>
                <StarIcon fontSize="large" className="star"></StarIcon>
            </div> 
            </IconButton>
            <IconButton  onClick={sendConvs} >
            <div className="icon-1 mobile">
                <SendIcon fontSize="large" className="bolt">
                </SendIcon>
            </div> 
            </IconButton>
        </div>
    )
}

export default Footer
