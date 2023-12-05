import React from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // set the file state
  const [file, setFile] = React.useState(undefined);
  // form that ready to be submitted to update the profile
  const [form, setForm] = React.useState({});
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

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
          className="bg-slate-700 text-white rouded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>

        {/* delete account and sign out */}
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </form>
      <p className="test-red-700"> {error ? error : ""} </p>
      <p className="text-green-700 mt-5">
        {" "}
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
