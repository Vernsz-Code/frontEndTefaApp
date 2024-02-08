import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import Wellcome from './Wellcome';
import {io} from 'socket.io-client';
import Chat from '../components/Chat';

function MainPage() {
    const socketUrl = process.env.REACT_APP_SOCKET_URL;
    const url = process.env.REACT_APP_BASE_URL + "/getuser";
    const socket = useRef()
    const [currentData, setCurrentData] = useState(undefined);
    const [Contacts, setContacts] = useState([]);
    const [IsLoaded, setIsLoaded] = useState(false)
    const [CurrentChat, setCurrentChat] = useState(undefined)
    const [recentMessage, setrecentMessage] = useState(null)
    const username = JSON.parse(localStorage.getItem("username"));
    const navigate = useNavigate()
    useEffect(() => {
        async function getData(){
            if(!localStorage.getItem("username")){
                navigate("/login")
            } 
            else{
                if(currentData){
                    return;
                }
                setIsLoaded(true)
                setCurrentData( await username)
            }
        }
        getData()
    }, []);
    useEffect(() => {
      if(username){
        socket.current = io(socketUrl);
        socket.current.emit("add-user", username._id)

      }
    }, [])
    
    useEffect(() => {
        async function getData(){
            if(currentData){
                const res = await axios.get(`${url}/${currentData._id}`);
                setContacts(res.data)
            }
        }
        getData();
    }, [currentData]);
    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    }
    const handleRecentChat = (chatMessage) => {
        setrecentMessage(chatMessage)
    }
  return (
    <div className='w-[100%] h-[100vh] flex flex-wrap overflow-hidden'>
        <Contact Contacts={Contacts} CurrentData={currentData} CurrentChat={handleChangeChat} RecentMessage={recentMessage}/>
        <div id="mainPage" className="w-[75%] h-[100vh]">
            {
                IsLoaded && CurrentChat !== undefined? <Chat RecentMessage={handleRecentChat} CurrentChat={CurrentChat} socket={socket} CurrentUser={username ? username : "..."}/> : <Wellcome CurrentUser={username ? username.username : "..."}/>
            }
        </div>
    </div>
  )
}

export default MainPage