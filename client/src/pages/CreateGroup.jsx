import React from "react";

export default function CreateGroup() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Group
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Group Name"
            className="border p-3 rounded-lg"
            id="group_name"
            maxLength={62}
            minLength={1}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Group Passcode"
            className="border p-3 rounded-lg"
            id="passcode"
            minLength={1}
            required
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
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
            />
            <button className="p-3 text-green-500 border border-green-500 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-80">
            Create Group
          </button>
        </div>
      </form>
    </main>
  );
}
