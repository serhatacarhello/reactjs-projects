import { useState } from "react";

function App() {
  const [color, setColor] = useState("violet");
  return (
    <div className={`w-full h-screen duration-200 bg-${color}-500`}>
      <h1 className="py-5 px-2">A bg changer app with vite</h1>

      <div
        className=" 
       fixed flex flex-wrap justify-center  bottom-10 inset-x-0  px-2 py-3  max-w-full"
      >
        <div className="flex flex-wrap justify-center gap-3 shadow-md bg-white px-3 py-2 rounded-full">
          <button
            onClick={() => setColor("red")}
            className="bg-red-500 duration-200 hover:bg-red-600 outline-none px-4 py1 rounded-full text-black shadow-lg py-2"
          >
            red
          </button>
          <button
            onClick={() => setColor("green")}
            className="bg-green-500 outline-none px-4 py1 rounded-full text-black shadow-lg py-2 duration-200 hover:bg-green-600"
          >
            green
          </button>
          <button
            onClick={() => setColor("blue")}
            className="bg-blue-500 duration-200 hover:bg-blue-600 outline-none px-4 py1 rounded-full text-black shadow-lg py-2"
          >
            blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
