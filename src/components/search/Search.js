import React from 'react'
import '../conversations/Converstions.scss'

// `https://tinder-bacned.herokuapp.com/users/${reslutSearching._id}/avatar` online backend
// `http://localhost:8001/users/${reslutSearching._id}/avatar`
function Search({reslutSearching}) {
    return (
        <div className="conversations"  >
                <img className="conversationsImg" src={reslutSearching ? `https://tinder-bacned.herokuapp.com/users/${reslutSearching._id}/avatar` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy9MzI8YXc-v9nsSWVkgMaRTexZqdmtRsjg&usqp=CAU" } alt="user" ></img>
                    <span className="conversationsName">
                     {reslutSearching ? reslutSearching.username : <span>No User found yet</span>}
                    </span>
        </div>  
    )
}

export default Search
