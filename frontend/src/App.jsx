import { Routes, Route } from "react-router-dom";
import "./utils/axios";
import ChatRoom from "./pages/Chat/ChatRoom/ChatRoom";
import LayoutChatRoom from "./pages/Chat/LayoutChatRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutChatRoom />} />
        <Route path="/:roomId" element={<ChatRoom />} />
      </Routes>
    </>
  );
}
export default App;