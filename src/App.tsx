import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBar from "./components/ChatBar";
import ChatFooter from "./components/ChatFooter";
import ChatBody from "./components/ChatBody";
import "./app.css";

const socket = io("ws://localhost:3000/", {
  withCredentials: false
});

type User = {
  userName: string;
  socketID: string;
};

type Message = {
  text: string;
  name: string;
  id: string;
  socketID: string;
};

export default function () {
  const [userName, setUserName] = useState<any>(
    localStorage.getItem("userName") === "undefined" ||
      !localStorage.getItem("userName")
      ? "anonimus"
      : localStorage.getItem("userName")
  );
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("newUser", userName);
    socket.on("messageResponse", (data: Message) => {
      setMessages([...messages, data]);
    });
    socket.on("newUserResponse", (data: User[]) => {
      setUsers(data);
    });
  }, [socket, messages]);

  const userNameHandler = (e: any) => {
    e.preventDefault();
    const oldUserName = localStorage.getItem("userName");
    localStorage.setItem("userName", userName);
    socket.emit("changeUserName", {
      oldUserName,
      userName,
      socketId: socket.id
    });
  };

  return (
    <div className='chat'>
      <form onSubmit={userNameHandler}>
        <input
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type='submit' value='Set' />
      </form>
      <ChatBar users={users} socket={socket} />
      <div className='chat_main'>
        <ChatBody messages={messages} socketID={socket.id} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
