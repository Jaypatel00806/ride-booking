import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import DarkToggle from "./DarkToggle";
import { useNavigate } from "react-router-dom";
import BookingFlow from "./booking/BookingFlow";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen">
        <Sidebar role={role} />
      </div>

      {/* Main */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 ml-64 overflow-y-auto p-8"
      >

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            Ride Booking
          </h1>

          <div className="flex gap-3 items-center">

            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded">
              {role === "master_admin" ? "Master Admin" : "Admin"}
            </span>

            <DarkToggle />

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

          </div>
        </div>

        {/* Only booking system */}
        <BookingFlow />

      </motion.div>
    </div>
  );
}