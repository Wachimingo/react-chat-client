import React from "react";

export default function ({ users, socket }: any) {
  return (
    <div className='chat_sidebar'>
      <h2>Open Chat</h2>
      <div>
        <h4 className='chat_header'>Active Users</h4>
        <div className='chat_users'>
          {users.map((user: string, i: number) => {
            if (user.split("_")[1] === socket.id) {
              return <p key={`User_${user}_${i}`}>Me</p>;
            } else {
              return <p key={`User_${user}_${i}`}>{user.split("_")[0]}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
