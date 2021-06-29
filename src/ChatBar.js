import { Avatar, IconButton } from '@material-ui/core'
import './chatBar.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useEffect, useState } from 'react';
// import axios from './axios'
import {  Link, useParams } from "react-router-dom";
import db from './firebase';
import { useStateValues } from './StateProvider';
import firebase from 'firebase';

const ChatBar = () => {
    const [{user}, dispatch] = useStateValues();
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setroomName] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => {
                setroomName(snapshot.data().roomName)
            })

            db.collection('rooms').doc(roomId)
            .collection("messages").orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )))
            ))
        }
    }, [roomId])

    const sendMessage = (e) =>{
        e.preventDefault()
        // await axios.post('/messages/new',{
        //     message: input,
        //     name: "urala",
        //     timestamp: "12/05/2021",
        //     recived: true
        // })
        db.collection('rooms').doc(roomId)
        .collection("messages").add({
            message: input,
            sentperson: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            senderEmail: user.email,
        });
        setInput('');
    }
    
    const addInput = (e) =>{
        setInput(e.target.value)
    }

    return (
        <div className="chat">
            <div className="chat__header">
                    <Avatar />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {
                           new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerButton">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map((message) => (
                        <p key={message.id} className={`chat__message ${message.data.senderEmail === user.email && 'chat__sent'}`}>
                            <span className="chat__name">{message.data.sentperson}</span>
                            {message.data.message}
                            <span className="chat__timestamp">
                                {new Date(message.data.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))
                    
                }               
            </div>
            
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input onChange={addInput} value={input} placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default ChatBar
