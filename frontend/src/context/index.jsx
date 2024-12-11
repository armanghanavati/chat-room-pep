import { createContext, useContext, useState } from "react";

const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userRole, setUserRole] = useState({});
  const [showToast, setShowToast] = useState({});
  const [roomId, setRoomId] = useState("");

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userRole,
        setUserRole,
        showToast,
        setShowToast,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
