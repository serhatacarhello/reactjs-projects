// second step
import { useState } from "react";
import UserContext from "./UserContent";
// Create a provider with provider method for UserContext and provide value
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  //third step => create a wrapper for app => main.jsx

  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
