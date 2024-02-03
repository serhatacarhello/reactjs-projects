import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Loading, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const user = userData?.name;
  const [posts, setPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
        setAuthenticated(true);
      } else {
        dispatch(logout());
        setAuthenticated(false);
      }
    });
  }, [dispatch, userData]);

  useEffect(() => {
    if (authenticated) {
      appwriteService
        .getPosts([])
        .then((posts) => (posts ? setPosts(posts.documents) : null));
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="w-full py-8 min-h-screen">
        <h2 className="text-center font-bold text-2xl ">Home</h2>
        <Container>
          <div className="flex flex-wrap">
            <h1>Login to read posts</h1>
          </div>
        </Container>
      </div>
    );
  }

  if (!posts) return <Loading />;

  return (
    <div className="w-full py-8 min-h-screen">
      <h2 className="text-center font-bold text-2xl ">Home</h2>
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
