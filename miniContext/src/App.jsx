import { useContext } from "react";
import "./App.css";
import { Login, Profile } from "./components";
import UserContext from "./context/UserContent";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>React App for Context API</h2>
      <Login />
      {!user && <p>Please log in to see your profile!</p>}
      {user && <Profile />}
    </>
  );
}

export default App;
