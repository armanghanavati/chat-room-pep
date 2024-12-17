import { createContext, useContext, useState } from "react";

const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [showToast, setShowToast] = useState({});
  const [roomId, setRoomId] = useState(null);
  const [allAdminChat, setAllAdminChat] = useState([]);

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setUserInfo,
        showToast,
        setShowToast,
        roomId,
        setRoomId,
        allAdminChat,
        setAllAdminChat,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
