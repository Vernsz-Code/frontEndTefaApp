import React, {useEffect, useState} from 'react'
import {Avatar, ScrollShadow, Button} from "@nextui-org/react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function Contact({ Contacts, CurrentData, CurrentChat }) {
    const navigate = useNavigate();
    const urlg = process.env.REACT_APP_BASE_URL + "/messages/get";
    const [RecentMessage, setRecentMessage] = useState([]);
    const [currentSelected, setCurrentSelected] = useState(undefined);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const promises = Contacts.map(async (data) => {
            const response = await axios.post(urlg, {
              from: CurrentData?._id,
              to: data._id,
            });
            return response.data;
          });
  
          const results = await Promise.all(promises);
          setRecentMessage(results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [Contacts, CurrentData]); // Menambahkan dependencies yang diperlukan
  
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      CurrentChat(contact);
    };
  
    return (
      <div className="w-[25%] h-[100vh]">
        <ScrollShadow offset="top" hideScrollBar id="leftPage" className="w-[100%] overflow-y-auto h-[90%] shadow-xl bg-transparent backdrop-brightness-150 backdrop-blur-md py-2 px-4">
          {RecentMessage.map((messages, index) => (
            <div
              key={index}
              className={` ${index === currentSelected ? 'bg-[#6681bc]' : 'bg-transparent'} flex shadow-lg flex-wrap p-3 mb-3 text-white backdrop-brightness-0 transition-all rounded-md hover:bg-[#6681bc]`}
              onClick={() => { changeCurrentChat(index, Contacts[index]) }}
            >
              <div className="w-[100%] flex flex-wrap">
                <Avatar size="md" />
                <span id={`username-${index}`} className='mt-2 ml-4'>{Contacts[index].username}</span>
              </div>
              <span id={`lastmessage-${index}`} className='text-sm mt-3'>
                {messages.length > 0 ? (
                  <span>
                    {messages[messages.length - 1].message.length > 40 ? messages[messages.length - 1].message.slice(0, 40) : messages[messages.length - 1].message}
                  </span>
                ) : ''}
              </span>
            </div>
          ))}
        </ScrollShadow>
        <div className="bg-[#1f2756] backdrop-blur-md p-5 flex items-center justify-start w-full h-[10%]">
          <Button color='primary' className='text-white font-bold font-sans cursor-pointer' onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}>Log Out</Button>
        </div>
      </div>
    );
  }
  
  export default Contact;