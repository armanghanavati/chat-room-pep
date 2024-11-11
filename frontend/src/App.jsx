import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatGroup from "./pages/Group/index";
import Login from "./pages/Login";
import ChatMessage from "./pages/ChatRoom/Chat/ChatMessage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<ChatMessage />} />
        <Route path="/" element={<Login />} />
        <Route path="/chatGroup" element={<ChatGroup />} />
        {/* <Route path="/room" element={<Room />} /> */}
      </Routes>
    </div>
  );
}

export default App;
