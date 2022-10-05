import React from "react";
import { Message } from "./../interfaces/messages";

type Props = {
  messages: Message[];
  socketID: string;
};

export default function ({ messages, socketID }: Props) {
  return (
    <>
      <header className='chat_mainHeader'>
        <p>Chat</p>
        <button className='leaveChat_btn'>Exit</button>
      </header>
      <div className='message_container'>
        {messages.map((message: Message, i: number) => {
          if (message.socketID !== socketID) {
            return (
              <div key={`message${i}`} className='message_chat'>
                <p className='sender_name'>{message.name}</p>
                <div className='message_sender'>
                  <p>{message.text}</p>
                </div>
              </div>
            );
          } else {
            <>
              <p>Me</p>
              <div className='message_recipient'>
                <p>{message.text}</p>
              </div>
            </>;
          }
        })}
      </div>
    </>
  );
}
