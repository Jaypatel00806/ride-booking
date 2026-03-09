import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserShield } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-indigo-800 text-white flex flex-col p-6 shadow-lg">

      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
        🚕 Ride Admin
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/admin"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <FaUserShield />
          Admin Panel
        </Link>

      </nav>

      {/* Footer */}
      <div className="mt-auto text-sm text-indigo-200">
        Ride Booking
      </div>

    </div>
  );
}