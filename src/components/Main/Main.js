
import React , { useState , useEffect, useRef, useMemo  } from 'react';
import TinderCard from 'react-tinder-card'
import instance from '../../axios';
import '../../components/Main/Main.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../Footer/Footer';

function Main({sendToNav}) {

    const [people, setPeople] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(people.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const [CardSwipe  , setCardSwipe ] = useState()
    const [newState , setStateCurrent] = useState()

    //console.log(people);
    //console.log(newState);
  // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
    const childRefs = useMemo(
    () =>
      Array(people.length).fill(0).map((i) => React.createRef()),
    [people.length]
    )


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < people.length - 1 //0

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx , CardID) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
    setCardSwipe({
      owner : name ,
      cardId :CardID
    })
    

  }


  //console.log();

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < people.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

    useEffect(() => {
        const fetchData = async ()=>{
            const req = await instance.get('/tinder/card' )
            setPeople(req.data)      
            setStateCurrent(people[currentIndexRef.current])
        }
        fetchData()
    }, [people])



    // `url(https://tinder-bacned.herokuapp.com/users/${card.owner}/avatar)` for images 
    //console.log(people);
    // `url(http://localhost:8001/users/${card?.owner}/avatar)`
    return (
    <div className="flex">
        <div className="cards">
            {people.map((card , index) =>  (
              <div className="hamid" >
               <TinderCard
               ref={childRefs[index]}
               className='swipe'
               key={card._id}
               onSwipe={(dir) => swiped(dir, card.name, index)}
               onCardLeftScreen={() => outOfFrame(card?.owner, index , card._id)}
    
                >
                <div  style={ {backgroundImage : `url(https://tinder-bacned.herokuapp.com/users/${card?.owner}/avatar)`} } className="card" >
              
                    <h3>{card.name}</h3>
                    <div className="likeAndStars" >
                        <div>
                            <FavoriteIcon fontSize="large" className="fav"  ></FavoriteIcon>
                            <div>{card.Hearts.length}  Hearts</div>
                        </div>
                        <div>
                            <StarIcon fontSize="large" className="star"></StarIcon>
                            <div>{card.Stars.length} Stars</div>
                        </div>
                    </div>
                </div>
                </TinderCard>
                
                <Footer  CardOwner={newState} PeopleCard={people[people.length - 1]} swipe={swipe} goBack={goBack} sendToNvaBar={sendToNav} />
                </div>
                
            ))}

        </div>
      

    </div>
    )
}

export default Main
