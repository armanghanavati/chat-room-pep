import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import "./utils/axios";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
