
import "./Messages.scss"
import {format} from "timeago.js"
function Messages({memeber,message , own ,UserId } , props) {
    
    // `https://tinder-bacned.herokuapp.com/users/${UserId}/avatar` : `https://tinder-bacned.herokuapp.com/users/${memeber}/avatar` server online
    // `http://localhost:8001/users/${UserId}/avatar` : `http://localhost:8001/users/${memeber}/avatar`
    console.log(own);
    return (
  
        <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={own ? `https://tinder-bacned.herokuapp.com/users/${UserId}/avatar` : `https://tinder-bacned.herokuapp.com/users/${memeber}/avatar` }
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    )
}

export default Messages
