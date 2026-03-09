import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import BookingFlow from "./booking/BookingFlow";
import { useEffect, useState } from "react";
import { FaCar, FaClock, FaCheckCircle, FaBell } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [bookings, setBookings] = useState([]);
  const [previousCount, setPreviousCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {

    const userRole = localStorage.getItem("role");
    setRole(userRole);

    loadBookings();

    const interval = setInterval(loadBookings, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadBookings = async () => {

    const res = await axios.get("http://127.0.0.1:3001/bookings");

    const newBookings = res.data;

    if (newBookings.length > previousCount && previousCount !== 0) {
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }

    setPreviousCount(newBookings.length);
    setBookings(newBookings);

  };

  const total = bookings.length;

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const approved = bookings.filter(
    (b) => b.status === "Approved"
  ).length;

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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 ml-64 overflow-y-auto p-8"
      >

        {/* Notification */}
        {showNotification && (
          <div className="fixed top-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <FaBell />
            New Booking Received
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Ride Booking Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Manage and create ride bookings
            </p>
          </div>

          <div className="flex gap-3 items-center">

            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {role === "master_admin" ? "Master Admin" : "Admin"}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Rides
              </p>

              <h2 className="text-2xl font-bold text-indigo-600">
                {total}
              </h2>
            </div>

            <FaCar className="text-indigo-500 text-2xl" />

          </div>

          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-yellow-500">
                {pending}
              </h2>
            </div>

            <FaClock className="text-yellow-500 text-2xl" />

          </div>

          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                {approved}
              </h2>
            </div>

            <FaCheckCircle className="text-green-600 text-2xl" />

          </div>

        </div>

        {/* Booking Flow */}
        <div className="bg-white p-6 rounded-xl shadow">
          <BookingFlow />
        </div>

      </motion.div>

    </div>

  );

}