import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:3001/auth/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // save role
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
          Welcome Back
        </h2>

        <input
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-pink-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-pink-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition"
        >
          Login
        </button>

        <p
          onClick={() => navigate("/")}
          className="text-center mt-4 text-sm text-gray-600 cursor-pointer hover:text-pink-600"
        >
          New user? Register
        </p>
      </div>
    </div>
  );
}