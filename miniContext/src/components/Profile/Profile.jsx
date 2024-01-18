import { useContext } from "react";
import UserContext from "../../context/UserContent";

export default function Profile() {
  //let's use context API
  const { user } = useContext(UserContext);
  if (!user) return <div style={{ color: "red" }}>Please log in.</div>;
  return (
    <div>
      <h4>Your Profile</h4>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
    </div>
  );
}
