import React, { useState } from "react";

export default function ({ socket }: any) {
  const [message, setMessage] = useState("");

  const handleMessage = (e: any) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id
      });
    }
    setMessage("");
  };
  return (
    <div className='chat_footer'>
      <form className='form' onSubmit={handleMessage}>
        <input
          type='text'
          placeholder='Write message'
          className='message'
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <button className='sendBtn'>Send</button>
      </form>
    </div>
  );
}
