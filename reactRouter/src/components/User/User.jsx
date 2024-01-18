import { useParams } from "react-router-dom";

export default function User() {
  let { userId } = useParams();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <img
          src="https://placekitten.com/200/200"
          alt="Profile"
          className="w-28 h-w-28 rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Serhat Acar
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Web Developer {userId}
        </p>
      </div>
    </div>
  );
}
