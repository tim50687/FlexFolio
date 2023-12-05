import React from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // set the file state
  const [file, setFile] = React.useState(undefined);
  // form that ready to be submitted to update the profile
  const [form, setForm] = React.useState({});
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  // show groups error
  const [showGroupsError, setShowGroupsError] = React.useState(false);

  // save groups that the user belongs to
  const [userGroups, setUserGroups] = React.useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log(form);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("headshot", file);

    try {
      const response = await fetch("/api/users/update-profile-picture", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile picture upadted successfully", data.headshotUrl);
        // get the file
        const imgUrl = "/api/users" + data.headshotUrl;
        setForm({ ...form, user_photo_url: imgUrl });
      } else {
        console.error("Failed to update profile picture: ", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle the username change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // handle delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch("/api/users/delete-account", {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      // Redirect to sign-in page after successful deletion
      navigate("/sign-in"); // Replace "/signin" with your sign-in route
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      dispatch(signOutUserSuccess());
      // Redirect to sign-in page after successful sign out
      navigate("/sign-in"); // Replace "/signin" with your sign-in route
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // handle show groups
  const handleShowGroups = async () => {
    try {
      setShowGroupsError(false);
      const res = await fetch("/api/groups/belonging-groups");
      const data = await res.json();
      if (data.success === false) {
        setShowGroupsError(true);
        return;
      }
      setUserGroups(data.groups);
    } catch (error) {
      setShowGroupsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={form.user_photo_url || currentUser.user_photo_url}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.user_name}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
        {/* create group */}
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-group"}
        >
          Create group
        </Link>

        {/* delete account and sign out */}
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
      </form>
      <p className="test-red-700"> {error ? error : ""} </p>
      <p className="text-green-700 mt-5">
        {" "}
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
      <button onClick={handleShowGroups} className="text-green-700">
        Show Groups
      </button>
      <p className="text-red-700 mt-5">
        {showGroupsError ? "Failed to show groups" : ""}
      </p>

      {userGroups &&
        userGroups.length > 0 &&
        userGroups.map((group) => {
          return (
            <div
              key={group.group_name}
              className="flex gap-4 border rounded-lg p-3 justify-between items-center"
            >
              <Link to={`/groups/${group.group_name}`}>
                <img
                  src={group.group_photo_url}
                  alt="Group Picture"
                  className="h-16 w-16 object-contain "
                />
              </Link>
              <Link
                className="text-blue-700 flex-1 hover:underline font-semibold truncate"
                to={`/groups/${group.group_name}`}
              >
                <p className="text-blue-700 hover:underline font-semibold truncate">
                  {group.group_name}
                </p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-red-700 uppercase">Delete</button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
