import { Outlet } from "react-router-dom";
import { Footer, Header, Loading } from "./components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useSelector } from "react-redux";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userSata);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login({ userData })) : dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch, userData]);

  return !loading ? (
    <>
      <div className="min-h-screen  flex flex-wrap flex-col content-between bg-gray-400">
        <div className="w-full block">
          <Header />
        </div>
        <main>
          <Outlet />
        </main>
        <div className="w-full block">
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default App;
