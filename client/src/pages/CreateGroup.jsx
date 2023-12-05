import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const [files, setFiles] = useState(undefined);

  // create form data
  const [form, setForm] = useState({
    group_name: "",
    description: "",
    passcode: "",
    group_photo_url: "",
  });
  console.log(form);

  // check error and loading state
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (files) {
      handleImageUpload(files);
    }
  }, [files]);
  // handle the image upload
  const handleImageUpload = async (files) => {
    const formData = new FormData();
    formData.append("groupPicture", files);
    try {
      const response = await fetch("/api/groups/update-group-picture", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Images uploaded successfully", data.groupPhotoUrl);
        // get the file
        const imgUrl = "/api/groups" + data.groupPhotoUrl;
        setForm({ ...form, group_photo_url: imgUrl });
      } else {
        console.error("Failed to upload images: ", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.group_photo_url === "") {
        setError("Please upload a group picture");
        return;
      }
      setLoading(true);
      setError(false);
      // submit the form
      const res = await fetch("/api/groups/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setLoading(false);
      // handle backend errors
      if (data.success === false) {
        setError(data.message);
        return;
      }

      // if successfully create, redirect to group page
      navigate("/group/" + data.group.group_name);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Group
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Group Name"
            className="border p-3 rounded-lg"
            id="group_name"
            maxLength={62}
            minLength={1}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Group Passcode"
            className="border p-3 rounded-lg"
            id="passcode"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              Set up the group picture
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files[0])}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
            />
          </div>
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Create Group"}
          </button>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </form>
    </main>
  );
}
