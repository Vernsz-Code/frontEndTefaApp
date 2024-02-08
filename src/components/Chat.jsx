import React, { useEffect, useRef, useState } from 'react'
import { ScrollShadow} from "@nextui-org/react";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import ChatInput from './ChatInput';

function Chat({CurrentChat, CurrentUser, socket, RecentMessage}) {
    const url = process.env.REACT_APP_BASE_URL + "/messages/send";
    const urlg = process.env.REACT_APP_BASE_URL + "/messages/get";
    const [messages, setmessages] = useState([])
    const [arrival, setarrival] = useState(null)
    const scrollRef = useRef();
    useEffect(()=>{
        if(CurrentChat){
            async function getData(){
                const data = await axios.post(urlg, {
                    from: CurrentUser._id,
                    to: CurrentChat._id,
                })
                setmessages(data.data);
            }
            getData();
        }
    }, [CurrentChat])
    const handleMessage = async (msg) => {
        await axios.post(url, {
            messageContent: msg,
            from: CurrentUser._id,
            to: CurrentChat._id,
        })
        .catch((err)=> {
            console.log(err)
        })
        socket.current.emit("send-msg", {
            from: CurrentUser._id,
            to: CurrentChat._id,
            message: msg,
        })   
        const msgs = [...messages]
        msgs.push({fromSelf: true, message:msg})
        setmessages(msgs)
    }
    useEffect(()=> {
        if(socket.current){
            socket.current.on("msg-receiver", (msg) => {
                setarrival({fromSelf: false, message:msg})
            })
        }
    })

    useEffect(()=>{
        arrival&&setmessages((prev)=> [...prev, arrival])
    }, [arrival])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])
  return (
    <div className='w-full h-[100%]'>
        {
            CurrentChat && (<>
            <ScrollShadow hideScrollBar id="mainChat" className="w-100% h-[90%] py-6 px-5">
            {messages.map((msg) => {
                return(
                    <div ref={scrollRef} key={uuidv4()}  id="sendMessage" className={` w-[100%] min-h-[3em] flex ${msg.fromSelf ? 'justify-end' : 'justify-start'} mb-7`}>
                        <div className={`text-right text-white text-sm max-w-[70%] ${msg.fromSelf ? 'bg-[#47c947]' : 'bg-gray-600'} py-5 px-3 rounded-md`}>
                        {msg.message}
                        </div>
                    </div>
                )
            })}
        </ScrollShadow>
        <ChatInput HandleMessage={handleMessage}/>
            </>)
        }
        
    </div>
  )
}

export default Chat