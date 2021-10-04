import React,{ useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import Room from './components/screens/room/Room'
import Chat from './components/screens/chat/Chat'
import Message from './components/screens/message/Message'
import Navbar from './components/Navbar'
import './App.css'
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile'
import {reducer, initialState} from './reducers/userReducer'
import SubcribesUserPosts from './components/screens/SubcribesUserPosts'


export const UserContext = createContext()



const Rounting = () =>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){ 
          dispatch({type:"USER",payload:user})
        }
        else{
          history.push('/login') 
        }
        
    },[dispatch, history])
 
  return(
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/Login' exact>
        <Login />
      </Route>
      <Route path='/Signup' exact>
        <Signup />
      </Route>
      <Route path='/CreatePost' exact>
        <CreatePost />
      </Route>
      <Route path='/Profile' exact>
        <Profile />
      </Route>
      <Route path='/Profile/:userid' exact>
        <UserProfile />
      </Route>
      <Route path='/myfollowingpost' exact>
        <SubcribesUserPosts />
      </Route>
      <Route path='/Room' exact>
        <Room />
      </Route>
      <Route path='/Chat' exact>
        <Chat />
      </Route>
      <Route path='/Message' exact>
        <Message />
      </Route>
    </Switch>

  )
}

function App() {

  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Rounting />

        
      </BrowserRouter>
    </UserContext.Provider>
  ) 
}

export default App;
