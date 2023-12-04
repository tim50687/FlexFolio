import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleCHange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // not to refresh the page
    try {
      setLoading(true); // set the loading to true
      // submit the form
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      // handle backend errors
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // if successfully registered
      setLoading(false); // set the loading to false
      setError(null); // set the error to null

      // redirect to sign in page
      navigate("/");
    } catch (error) {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleCHange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleCHange}
        />
        <button
          disabled={loading} // whenever it's loading you can not click on it
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up" className="text-blue-700 hover:underline">
          <span>Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
