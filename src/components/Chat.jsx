import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";

function Chat({ CurrentChat, CurrentUser, socket }) {
  const url = process.env.REACT_APP_BASE_URL + "/messages/send";
  const urlg = process.env.REACT_APP_BASE_URL + "/messages/get";
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (CurrentChat) {
      async function getData() {
        const data = await axios.post(urlg, {
          from: CurrentUser._id,
          to: CurrentChat._id,
        });
        setMessages(data.data);
      }
      getData();
    }
  }, [CurrentChat, CurrentUser._id]);

  const handleMessage = async (msg) => {
    await axios
      .post(url, {
        messageContent: msg,
        from: CurrentUser._id,
        to: CurrentChat._id,
      })
      .catch((err) => {
        console.log(err);
      });
    socket.current.emit("send-msg", {
      from: CurrentUser._id,
      to: CurrentChat._id,
      message: msg,
    });

    // Menambahkan pesan yang dikirim ke antarmuka pengguna
    setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receiver", (msg) => {
        setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
      });
    }
    return () => {
      if (socket.current) {
        socket.current.off("msg-receiver");
      }
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div class="w-full px-5 flex flex-col justify-between h-[100vh]">
      <div ref={scrollRef} class="flex no-scrollbar overflow-y-auto flex-col mt-5 h-[90%] overflow-x-hidden w-full">
        {messages.map((msg) => (
            msg.fromSelf ? (
                <div className="flex justify-end mb-4" key={uuidv4()}>
            <div className="mr-2 py-3 px-4 max-w-[70%] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              {msg.message}
            </div>
          </div>
            ): (
                <div class="flex justify-start mb-4">
            <div
              class="ml-2 py-3 px-4 max-w-[70%] bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
                {msg.message}
            </div>
          </div>
            )
          
        ))}
      </div>
      <div className="h-[10%] w-full">
        <ChatInput HandleMessage={handleMessage} />
      </div>
    </div>
  );
}

export default Chat;
