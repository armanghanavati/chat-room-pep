import React, { createContext, useContext, useState } from "react";

const OnlineUsersContext = createContext();

const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  return (
    <OnlineUsersContext.Provider
      value={{ onlineUsers, setOnlineUsers, userInfo, setUserInfo }}
    >
      {children}
    </OnlineUsersContext.Provider>
  );
};

const useContextApi = () => useContext(OnlineUsersContext);

export { OnlineUsersProvider, useContextApi };
