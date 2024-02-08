import React, {useEffect, useState} from 'react'
import {Avatar, ScrollShadow, Button} from "@nextui-org/react"
import { useNavigate } from 'react-router-dom'
function Contact({Contacts, CurrentData, CurrentChat, RecentMessage}) 
{
    const navigate = useNavigate();
    const [currentUsername, setCurrentUsername] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(()=> {
        if(CurrentData){
            setCurrentUsername(CurrentData.username);
        }
    }, [currentUsername])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        CurrentChat(contact)
    }
  return (
    <div className="w-[25%] h-[100vh]">
        <ScrollShadow offset="top" hideScrollBar id="leftPage" className="w-[100%] overflow-y-auto h-[90%] shadow-xl bg-transparent backdrop-brightness-150 backdrop-blur-md py-2 px-4">
        {
            Contacts.map((contact, index) => {
                return(
                <div 
                id="container-chat" 
                key={index} 
                className={` ${index === currentSelected? 'bg-[#6681bc]': 'bg-transparent'} flex shadow-lg flex-wrap p-3 mb-3 text-white backdrop-brightness-0 transition-all rounded-md hover:bg-[#6681bc]`}
                onClick={() => {changeCurrentChat(index, contact)}}
                >
                    <div className="w-[100%] flex flex-wrap">
                        <Avatar size="md"/>
                        <span id="username" className='mt-2 ml-4'>{contact.username}</span>
                    </div>
                    <span id="lastmassage" className='text-sm mt-3'>{RecentMessage ? (RecentMessage >= RecentMessage.slice(0,40)? RecentMessage.slice(0,40) + "..." : RecentMessage): ''}</span>
                </div>
                )
            })
        }
    </ScrollShadow>
    <div className="bg-[#1f2756] backdrop-blur-md p-5 flex items-center justify-start w-full h-[10%]">
        <Button color='primary' className='text-white font-bold font-sans cursor-pointer' onClick={()=>{
            localStorage.clear();
            navigate("/login")
        }}>Log Out</Button>
    </div>
    </div>
  )
}

export default Contact