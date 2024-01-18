import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContent";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    console.log(e.target);
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }
    setUser({ username, password });
    setError("");
  };

  useEffect(() => {
    if (username.trim() !== "" || password.trim() !== "") {
      setError("");
      return;
    }
  }, [username, password]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="username">Username</label>{" "}
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Serhat Acar"
          />
        </div>
        <br />
        <div className="">
          <label htmlFor="username">Password</label>{" "}
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        {error && (
          <>
            <br></br>
            <div style={{ color: "red" }}> {error} </div>
          </>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
