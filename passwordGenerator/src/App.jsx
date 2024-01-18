import { useCallback, useEffect, useRef, useState } from "react";

export default function App() {
  const passwordRef = useRef(null);
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generatePassword = useCallback(() => {
    let newPass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      newPass += str.charAt(randomIndex);
    }
    setPassword(newPass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswortToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };
  const savePasswordToHistory = () => {
    setPasswordHistory((prevHistory) => [password, ...prevHistory]);
  };
  const clearHistory = () => {
    setPasswordHistory(() => []);
  };
  return (
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
      <h1 className="text-white text-center my-3 text-2xl">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswortToClipboard}
          className="outline-none  bg-blue-700 text-white px-3
         py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            name="length"
            id="length"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">
            Length : <span className="text-white font-mono">{length}</span>
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="numberAllowed"
            id="numberAllowed"
            value={numberAllowed}
            defaultChecked={numberAllowed}
            className="cursor-pointer"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberAllowed">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="charAllowed"
            id="charAllowed"
            value={charAllowed}
            defaultChecked={charAllowed}
            className="cursor-pointer"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charAllowed">Characters</label>
        </div>
      </div>
      <div className="flex items-center justify-center my-4 gap-x-1">
        {" "}
        <button
          onClick={savePasswordToHistory}
          className="outline-none bg-green-700 text-white px-3 py-0.5 rounded-sm"
        >
          Save to History
        </button>
        <button
          onClick={clearHistory}
          className="outline-none bg-red-700 text-white px-3 py-0.5 rounded-sm"
        >
          Clear History
        </button>
      </div>

      <div>
        <h3>Password History:</h3>
        <ul>
          {passwordHistory.map((savedPassword, index) => (
            <li key={index}>{savedPassword}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
