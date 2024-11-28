import React, { createContext, useContext, useState } from "react";

const ContextApi = createContext();

const Context = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userRole, setUserRole] = useState({});

  return (
    <ContextApi.Provider
      value={{ onlineUsers, setOnlineUsers, userRole, setUserRole }}
    >
      {children}
    </ContextApi.Provider>
  );
};

const useContextApi = () => useContext(ContextApi);

export { Context, useContextApi };
