import React from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
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
import "../../src/Home.css";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // set the file state
  const [file, setFile] = React.useState(undefined);
  // form that ready to be submitted to update the profile
  const [form, setForm] = React.useState({});
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  // State for image loading
  const [imageLoading, setImageLoading] = useState(false);

  // show groups error
  const [showGroupsError, setShowGroupsError] = React.useState(false);

  // join groups error
  const [joinGroupsError, setJoinGroupsError] = React.useState(false);

  // save groups that the user belongs to
  const [userGroups, setUserGroups] = React.useState([]);

  // State for group code as number
  const [groupCode, setGroupCode] = React.useState(0);

  // State for logging workouts
  const [workout, setWorkout] = useState({
    exerciseName: "",
    sets: "",
    reps: "",
    weight: "",
  });

  // State to store user's workouts
  const [userWorkouts, setUserWorkouts] = useState([]);
  console.log(userWorkouts);

  // log workout error
  const [logWorkoutError, setLogWorkoutError] = useState(false);

  // log workout loading
  const [logWorkoutLoading, setLogWorkoutLoading] = useState(false);

  // log workout success
  const [logWorkoutSuccess, setLogWorkoutSuccess] = useState(false);

  // Handle workout data change
  const handleWorkoutChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  // Handle workout form submission
  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting workout data:", workout);

      // Check user input
      const setsValid = workout.sets > 0;
      const repsValid = workout.reps > 0;
      const weightValid = workout.weight > 0 && workout.weight < 99999;

      if (
        workout.exerciseName === "" ||
        !setsValid ||
        !repsValid ||
        !weightValid
      ) {
        setLogWorkoutError(true);
        return;
      }

      // Check user input
      if (
        workout.sets === "" ||
        workout.reps === "" ||
        workout.weight === "" ||
        workout.exerciseName === ""
      ) {
        setLogWorkoutError(true);
        return;
      }
      setLogWorkoutLoading(true);
      setLogWorkoutError(false);

      // Send a POST request to log a workout
      const response = await fetch(`/api/users/log-workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      const data = await response.json();

      setLogWorkoutLoading(false);

      // handle backend error
      if (data.success === false) {
        setLogWorkoutError(true);
        return;
      }

      // if successfully created a workout
      // Add workout to the userWorkouts state to display it immediately
      setUserWorkouts([...userWorkouts, data.workout]);

      // Clear the form fields
      setWorkout({ exerciseName: "", sets: "", reps: "", weight: "" });

      // set the success state to true
      setLogWorkoutSuccess(true);
    } catch {
      setLogWorkoutError(true);
      setLogWorkoutLoading(false);
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("headshot", file);

    try {
      // set the loading to true
      setImageLoading(true);
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
        setImageLoading(false);
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
      navigate("/sign-in");
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

  // handle leaving group
  const handleLeavingGroup = async (groupName) => {
    try {
      const res = await fetch("/api/groups/leave-group", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_name: groupName }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      console.log(data.message);
      // update the user groups
      const updatedGroups = userGroups.filter(
        (group) => group.group_name !== groupName
      );
      setUserGroups(updatedGroups);
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle join group
  const handleJoinGroup = async (e) => {
    e.preventDefault();

    try {
      setJoinGroupsError(false);
      // Send a POST request to join a group using the group code
      const response = await fetch(`/api/groups/join-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_code: groupCode }),
      });

      const data = await response.json();

      if (data.success === false) {
        setJoinGroupsError(true);
        return;
      }

      // Redirect to the group page (assuming the response contains the group name or ID)
      navigate("/groups/" + data.group.group_name);
    } catch (error) {
      console.log(error.message);
      setJoinGroupsError(true);
    }
  };

  // handle group code change
  const handleGroupCodeChange = (e) => {
    setGroupCode(e.target.value);
  };

  // Function to fetch user's workout
  const fetchUserWorkouts = async () => {
    try {
      const response = await fetch("/api/users/workout-logs", {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User's workouts fetched successfully", data.workouts);
        setUserWorkouts(data.workouts);
      } else {
        console.error("Failed to fetch user's workouts: ", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle workout delete
  const handleDeleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`/api/users/delete-workout/${workoutId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted workout from the userWorkouts state
        const updatedWorkouts = userWorkouts.filter(
          (workout) => workout.workout_id !== workoutId
        );
        setUserWorkouts(updatedWorkouts);
      } else {
        console.error("Failed to delete workout: ", data.message);
      }
    } catch {
      console.log(error);
    }
  };

  // Fetch user workouts on component mount
  useEffect(() => {
    fetchUserWorkouts();
  }, []);

  return (
    <div className="profile-page max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <div className="flex">
        {/* Left section */}
        <div className="flex-1 mr-5">
          {/* Log Workout form and functionalities */}
          <div className="workout-form mt-5">
            <h2 className="text-xl font-semibold mb-3">Log Your Workout</h2>
            <form
              onSubmit={handleWorkoutSubmit}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                name="exerciseName"
                placeholder="Exercise Name"
                value={workout.exerciseName}
                onChange={handleWorkoutChange}
                required
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={workout.sets}
                onChange={handleWorkoutChange}
                required
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={workout.reps}
                onChange={handleWorkoutChange}
                required
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (lb)"
                value={workout.weight}
                onChange={handleWorkoutChange}
                required
                className="border p-2 rounded-lg"
              />
              <button
                disabled={logWorkoutLoading}
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600"
              >
                {logWorkoutLoading ? "Loading..." : "Log Workout"}
              </button>
            </form>
            {/* display error */}
            <p className="text-red-700 mt-5">
              {logWorkoutError
                ? "Failed to log workout, sets and reps cannot be negative"
                : ""}
            </p>
            <p className="text-red-700 mt-5">
              {logWorkoutError
                ? "weight cannot be negative or greater than 99999"
                : ""}
            </p>
            <p className="text-green-700 mt-5">
              {" "}
              {logWorkoutSuccess ? "Log workout successfully" : ""}
            </p>
          </div>
          {/* Display Logged Workouts */}
          <div className="logged-workouts mt-5">
            <h2 className="text-xl font-semibold mb-3">Your Logged Workouts</h2>
            <div className="space-y-3">
              {userWorkouts.map((workout) => (
                <div
                  key={workout.workout_id} // to delete the workout in database and state later
                  className="border p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Exercise:</strong> {workout.exercise_name}
                    </p>
                    <p>
                      <strong>Sets:</strong> {workout.sets},{" "}
                      <strong>Reps:</strong> {workout.reps},{" "}
                      <strong>Weight:</strong> {workout.weight} lbs
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteWorkout(workout.workout_id)}
                    className="bg-red-500 text-white p-2 rounded-lg uppercase hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1">
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
              disabled={loading || imageLoading}
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

            {/* Divider */}
            <div className="text-center text-gray-600">or</div>

            {/* Join Group Input and Button */}
            <div className="flex items-center justify-between">
              <input
                type="number"
                onChange={handleGroupCodeChange}
                placeholder="Enter Group Code"
                className="border p-2 rounded-lg flex-grow mr-2"
              />
              <button
                onClick={handleJoinGroup}
                className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 flex-grow"
              >
                Join Group
              </button>
            </div>

            {/* delete account and sign out */}
            <div className="flex justify-between mt-5">
              <span
                onClick={handleDeleteUser}
                className="text-red-700 cursor-pointer"
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer"
              >
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
          <p className="text-red-700 mt-5">
            {joinGroupsError
              ? "Failed to join groups, already in the group or incorrect group code"
              : ""}
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
                    <button
                      onClick={() => handleLeavingGroup(group.group_name)}
                      className="text-red-700 uppercase"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
