import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const joinRoom = () => {
    if (user.length && room.length) {
      socket.emit("join_room", { user, room });
      setChatVisible(true);
    }
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="header">
          <h1>TrackChat</h1>{" "}
          <input
            onChange={(e) => {
              setUser(e.target.value);
            }}
            placeholder="Username"
            value={user}
          />
          <input
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            placeholder="Room Name"
            value={room}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
        {chatVisible ? <Chat socket={socket} user={user} room={room} /> : null}
      </div>
    </div>
  );
}

export default App;
