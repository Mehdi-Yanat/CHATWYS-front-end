import React from 'react';
import './App.css';

import {
  BrowserRouter ,
  Switch,
  Route,
  
} from "react-router-dom";

import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Sginup';
import EmailVerfiction from './components/Signup-email/EmailVerfiction';
import NavBar from './components/Header/NavBar';
import Messenger from './components/Messenger/Messenger';

function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
          <Route path="/Signup">
              <Signup/>
          </Route>
          <Route path="/Email-verification">
              <EmailVerfiction/>
          </Route>
          <Route path="/Profile" >
            <Profile  />
          </Route>
          <Route path="/Chat" >
            <Messenger/>
          </Route>
          <Route path="/Conversation" >
            <NavBar  />
          </Route>
          <Route path="/Login">
            <Login/>
          </Route>
          
          <Route exact path="/"> 
            <Home   />
          </Route>
         
      </Switch>
      </BrowserRouter>
      
    </div>
    
  );
}



export default App;
