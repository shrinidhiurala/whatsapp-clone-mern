import { Avatar } from '@material-ui/core'
import { useEffect, useState } from 'react'
import db from './firebase';
import './sideBarChat.css'

function SideBarChat({addNewCHat, roomName, id}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id)
            .collection("messages").orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    },[id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () =>{
        const newRoomName = prompt("Enter room name.");
        db.collection('rooms').add({
            roomName: newRoomName,
        });
    }
    return !addNewCHat ? (
        <div className="SideBarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="SideBarChat__info">
                <h2>{roomName}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="SideBarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SideBarChat
