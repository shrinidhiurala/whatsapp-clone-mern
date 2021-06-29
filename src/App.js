//import { useEffect, useState } from 'react';
import './App.css';
import ChatBar from './ChatBar';
import SideBar from './SideBar';
// import Pusher from 'pusher-js'
// import axios from './axios'
//import db from './firebase'
import {  BrowserRouter as Router,  Switch,  Route  } from "react-router-dom";
import Login from './Login';
import { useStateValues } from './StateProvider';

function App() {

  const [{user}, dispatch] = useStateValues();
  /*
    const [messages, setMessages] = useState([])
  
    useEffect(()=>{
      axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
    },[])

    useEffect(() => {
      const pusher = new Pusher('e964fef69c822786d8e4', {
        cluster: 'ap2'
      });

      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
        setMessages([...messages, newMessage])
      });

      return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
      };  
    }, [messages])
  */
  
  return (
    <div className="app">
      {
        !user ? (
          <Login />
        ) : (
          <div className="app__body" >        
              <Router>  
                  <SideBar />
                  <Switch>
                  
                      <Route path="/app/:roomId">
                          <ChatBar />
                      </Route>
          
                      <Route path="/">
                          
                      </Route>

                  </Switch>
              </Router>
          </div>
        )
      }
    </div>
  );
}

export default App;
