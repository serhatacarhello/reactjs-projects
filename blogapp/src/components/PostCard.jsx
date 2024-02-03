import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-sm  min-w-52 h-full overflow-hidden shadow-lg w-full bg-gray-100 rounded-xl p-4 xl:shrink-0  flex-1">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-xl h-auto max-w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            #live
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #demo
          </span>
        </div>
      </div>
    </Link>
  );
}
