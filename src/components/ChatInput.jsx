import React, { useState } from 'react'
import {Input, Button} from "@nextui-org/react";
import { FaRegPaperPlane } from "react-icons/fa";
function ChatInput({HandleMessage}) {
    const [msg, setmsg] = useState("")
    const sendMsg = (e) => {
        e.preventDefault();
        if(msg.length > 0){
            HandleMessage(msg)
            setmsg('')
        }
    }
  return (
    <div>
        <form onSubmit={e=>sendMsg(e)} className='w-[100%] h-[10%] flex flex-wrap justify-end px-4 items-center'>
            <Input autoFocus value={msg} onChange={(e)=> setmsg(e.target.value)} placeholder="send a message" size="sm" className="w-[80%]"/>
            <Button type='sumbit' isIconOnly size="md" className="ml-5" > 
                <FaRegPaperPlane/>
            </Button>
        </form>
    </div>
  )
}

export default ChatInput