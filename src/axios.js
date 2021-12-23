
import axios from 'axios'
const token = localStorage.getItem('authToken')
const instance = axios.create({
    
    baseURL:  "https://tinder-bacned.herokuapp.com/"
    //"http://localhost:8001/"
})
instance.defaults.headers.common['Authorization'] = token;

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.post['Content-Type'] = 'image/jpg'
instance.defaults.headers.get['Content-Type'] = 'image/png'
export default instance;