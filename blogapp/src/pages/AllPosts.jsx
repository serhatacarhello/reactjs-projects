import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, Loading, PostCard } from "../components";
export default function AllPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const user = userData?.name;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => (posts ? setPosts(posts.documents) : null));
  }, []);

  if (!posts) return <Loading />;
  return (
    <div
      className="w-full py-8 min-h-screen 
     "
    >
      <h2 className="text-center font-bold text-2xl ">All Posts</h2>
      <Container>
        <div className="flex flex-wrap">
          {posts && posts.length === 0 ? (
            <div className="flex flex-wrap ">
              {user ? (
                `Hello ${
                  user.charAt(0).toUpperCase() + user.toLowerCase().slice(1)
                }, There is no post`
              ) : (
                <h1>Login to read posts</h1>
              )}
            </div>
          ) : (
            posts.map((post) => (
              <div className="p-2 w-1/4 min-w-fit" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
