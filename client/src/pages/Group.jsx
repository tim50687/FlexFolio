import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Group() {
  // all the posts
  const [posts, setPosts] = useState([]);
  // group details
  const [groupDetails, setGroupDetails] = useState(null);
  // make a new post
  const [newPostContent, setNewPostContent] = useState({
    caption: "",
    post_photo_url: "",
  });
  console.log(newPostContent);
  // check if the image upload is successful
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  // set the files
  const [files, setFiles] = useState(undefined);

  // check loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { groupName } = useParams();

  const getByteSize = (str) => new Blob([str]).size;

  useEffect(() => {
    if (files) {
      handleImageUpload(files);
    }
  }, [files]);
  useEffect(() => {
    // fetch the group details
    const fetchGroupData = async () => {
      try {
        // before loading the data, set loading to true
        setLoading(true);
        setError(false);

        // get the group detail
        const gorupResponse = await fetch(`/api/groups/${groupName}`);
        if (!gorupResponse.ok) {
          throw new Error("Failed to fetch group details");
        }
        const groupData = await gorupResponse.json();
        setGroupDetails(groupData.group);

        // get the posts
        const postsResponse = await fetch(`/api/posts/${groupName}`);
        const postData = await postsResponse.json();
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        setPosts(postData.posts);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGroupData();
  }, [groupName]);

  // handle post creation
  const handlePostCreation = async (e) => {
    e.preventDefault();
    try {
      // check caption size
      const captionByteSize = getByteSize(newPostContent.caption);

      if (captionByteSize > 255) {
        setError("Caption exceeds the maximum length of 255 bytes.");
        return;
      }

      if (
        newPostContent.post_photo_url === "" ||
        newPostContent.caption === ""
      ) {
        setError("Please upload both photo and caption.");
        return;
      }
      setLoading(true);
      setError(false);

      // Append groupName to the newPostContent just before submission
      const postData = {
        ...newPostContent,
        group_name: groupName, // Add groupName here
      };

      // submit the form
      const response = await fetch("/api/posts/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      setLoading(false);
      // handle backend errors
      if (data.success === false) {
        setError(data.message);
        return;
      }

      // If successfully created a post
      // Add the new post to the top of the posts state
      setPosts((prevPosts) => [data.newPost, ...prevPosts]);

      // Clear the form
      setNewPostContent({ caption: "", post_photo_url: "" });

      // Notify the user
      alert("Post created successfully");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  // handle image upload
  const handleImageUpload = async (files) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("postPicture", files);
    try {
      const response = await fetch("/api/posts/update-post-picture", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Images uploaded successfully", data.postPhotoUrl);
        // get the file
        const imgUrl = "/api/posts" + data.postPhotoUrl;
        setNewPostContent({ ...newPostContent, post_photo_url: imgUrl });
        setImageUploadSuccess(true);
        setLoading(false);
      } else {
        console.error("Failed to upload images: ", data.message);
        setImageUploadSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setImageUploadSuccess(false);
    }
  };

  // Handle change
  const handleChange = (e) => {
    setNewPostContent({ ...newPostContent, [e.target.id]: e.target.value });
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      {/* Group detail */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-semibold mb-4">
          {groupDetails?.group_name}
        </h1>
        <img
          src={groupDetails?.group_photo_url}
          alt="Group"
          className="inline-block rounded-lg h-40 w-40 object-cover"
        />
      </section>

      {/* Make a post */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Create a Post</h2>
        <textarea
          onChange={handleChange}
          value={newPostContent.caption}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          placeholder="What's on your mind?"
          rows="4"
          id="caption"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files[0])}
          accept="image/*"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "
        />
        <button
          onClick={handlePostCreation}
          disabled={loading}
          className="mt-3 bg-blue-600 text-white p-3 rounded-lg w-full uppercase hover:bg-blue-700 disabled:opacity-80"
        >
          Post
        </button>
      </section>
      {/* check if image is uploaded and show the error */}

      {error && <p className="text-red-500 mt-5">{error}</p>}
      {/* Posts */}
      <section className="posts">
        <h2 className="text-2xl font-semibold mb-3">Group Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.post_id}
              className="post bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {post.images_url && (
                <img
                  src={post.images_url}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="p-4">
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
