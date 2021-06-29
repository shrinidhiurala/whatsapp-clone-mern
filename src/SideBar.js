import './sideBar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar,  IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SideBarChat from './SideBarChat';
import db from './firebase'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useStateValues } from './StateProvider';

const SideBar = () => {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValues();
    

    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot =>(
            setRooms(snapshot.docs.map(doc =>(
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    }, [])
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__serachCOntainer">
                    <SearchIcon />
                    <input type="text" placeholder="Serach or start new chat" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SideBarChat addNewCHat={true} />
                {
                    rooms.map(room =>(
                        <Link key={room.id} to={`/app/${room.id}`}>
                            <SideBarChat  id={room.id} roomName={room.data.roomName} />
                        </Link>
                    ))
                }          
                
            </div>
        </div>
    )
}

export default SideBar
