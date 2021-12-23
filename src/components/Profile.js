
import { useHistory } from 'react-router-dom'
import NavBar from './Header/NavBar'
import Profil from './Header/Profil'
import "./Profile.scss"
function Profile() {
   
    
    let history = useHistory()
    if(!localStorage.authToken){
        history.push('/login')
    }
    

    return (
        <div className='profileStyle' >
            <NavBar />
            <Profil  />
        </div>
    )
}

export default Profile
