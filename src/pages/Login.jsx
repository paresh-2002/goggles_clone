import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import bannerHero from "../assets/bannerHero.jpg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import { useDispatch } from "react-redux";
import authService from "../firebase/auth";
import { authUserActions } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      setError("");
      setLoggingIn(true);
      try {
        const session = await authService.login({email:loginCredentials.email, password:loginCredentials.password});
        if (session) {
          const userData = await authService.getCurrentUser({uid:session.uid});
          if (userData) dispatch(authUserActions.login(userData));
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoggingIn(false);
      }
  };
  return (
    <main className="grid  grid-rows-1 lg:grid-cols-2 w-full  h-screen m-auto">
      <section className=" hidden lg:block max-h-screen  rounded-lg">
        <img src={bannerHero} alt="" className="w-full h-full object-cover" />
      </section>
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-7 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
          <Logo />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold mb-3 ">Login to your account</h1>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col">
              Email
              <input
                type="email"
                className="border rounded-md p-1.5 shadow-sm"
                value={loginCredentials.email}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <label className="flex flex-col">
              Password
              <input
                type="password"
                className="border rounded-md p-1.5 shadow-sm"
                value={loginCredentials.password}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  })
                }
              />
            </label>
            <div className="w-full py-2   flex flex-col gap-4 items-center ">
              <button
                className="btn-primary w-2/3 text-lg text-center "
                disabled={
                  loggingIn ||
                  !loginCredentials.email || !loginCredentials.password
                }
              >
                {loggingIn ? "Logging In..." : "Login"}
              </button>
              <button
                className="btn-secondary w-2/3 text-sm md:text-base text-center"
                onClick={() => {
                  setLoginCredentials({
                    ...loginCredentials,
                    email: "admin@bangtan.com",
                    password: "admin0707",
                  });
                }}
              >
                Login as a Guest
              </button>
              <Link to="/signup" className="underline text-gray-600">
                Create New Account
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
