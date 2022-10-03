import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, user, room }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    const messageData = {
      user,
      room,
      createdAt:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      message,
    };
    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      await setMessageList((list) => [...list, data]);
    });
    console.log(messageList);
  }, [socket]);
  return (
    <div>
      <div className="chat-main-container">
        <ScrollToBottom className="messageListScroll">
          {messageList.map((message, idx) => {
            return (
              <div
                key={idx}
                className={message.user === user ? "left" : "right"}
              >
                <div className="messageWrapper">
                  <div
                    className={
                      message.user === user ? "sentMessage" : "receivedMessage"
                    }
                  >
                    <div>{message.message}</div>
                  </div>

                  <div
                    className={
                      message.user === user
                        ? "messageInfoLeft"
                        : "messageInfoRight"
                    }
                  >
                    <span>{message.user}</span> : {message.createdAt}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        <input
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Message"
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={() => console.log(messageList)}>messageList</button>
      </div>
    </div>
  );
}

export default Chat;
