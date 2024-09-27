import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../firebase/auth";
import { useNavigate } from "react-router";
import { authUserActions } from "../store/authSlice";

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState("profile");
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(authUserActions.logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] min-w-md max-w-lg m-auto mt-10">
      <section className="h-full p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full">
        <div className="flex">
          <button
            className={`flex-1 text-sm ${
              selectedItem === "profile"
                ? "bg-[--primary-text-color] text-white"
                : "bg-gray-100"
            } p-3 shadow-sm transition-colors`}
            onClick={() => setSelectedItem("profile")}
          >
            Profile
          </button>
          <button
            onClick={() => setSelectedItem("address")}
            className={`flex-1 text-sm ${
              selectedItem === "address"
                ? "bg-[--primary-text-color] text-white"
                : "bg-gray-100"
            } p-3 shadow-sm transition-colors`}
          >
            Address
          </button>
        </div>
        {selectedItem === "profile" ? (
          <div className="flex flex-col gap-4 w-full p-5">
            <p>
              <span className="text-gray-600 me-1">Username:</span>
              <span className="break-all">{userData?.username}</span>
            </p>
            <p>
              <span className="text-gray-600 me-1">Email:</span>
              <span className="break-all">{userData?.email}</span>
            </p>
            <hr />
            <button
              disabled={loading}
              className="w-1/2 text-sm bg-rose-600 py-2 px-4 text-white rounded-md hover:bg-rose-700"
              onClick={handleLogOut}
            >
              {loading ? "Logging Out..." : "Logout"}
            </button>
          </div>
        ) : (
          <section className="rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            {/*<Address isEdit />*/}
          </section>
        )}
      </section>
    </div>
  );
};

export default Profile;
