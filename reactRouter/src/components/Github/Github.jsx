// import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export const githubInfoLoader = async () => {
  return await fetch("https://api.github.com/users/serhatacarhello");
};

export default function Github() {
  //use loader and useLoaderData from react-router-dom
  const data = useLoaderData();

  //! instead of useState and useEffect from react

  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "https://api.github.com/users/serhatacarhello"
  //       );
  //       const data = await response.json();
  //       console.log("🚀 ~ fetchData ~ data:", data);

  //       setData(data);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <img
          src={data.avatar_url}
          alt="Profile"
          className="w-56 h-w-56 rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          {data.name}
        </h1>
        <p className="text-sm text-gray-600 text-center">Web Developer</p>
      </div>
    </div>
  );
}
