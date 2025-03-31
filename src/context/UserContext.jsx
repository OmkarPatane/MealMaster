import { createContext, useState, useContext } from "react";

const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [name] = useState(localStorage.getItem("UserName"));

  return (
    <>
      <UserContext.Provider value={{ name }}>{children}</UserContext.Provider>
    </>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
