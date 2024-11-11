import React, { createContext, useContext, useState } from "react";

const OnlineUsersContext = createContext();

const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

const useOnlineUsers = () => useContext(OnlineUsersContext);

export { OnlineUsersProvider, useOnlineUsers };
