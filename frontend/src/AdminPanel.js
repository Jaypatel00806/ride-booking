import Sidebar from "./Sidebar";
import LiveBookings from "./components/LiveBookings";
// import DriverTracking from "./components/DriverTracking";

export default function AdminPanel() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* ===== FIXED SIDEBAR ===== */}
      <div className="w-64 fixed left-0 top-0 h-screen">
        <Sidebar />z
      </div>

      {/* ===== MAIN CONTENT (SCROLLABLE) ===== */}
      <div className="flex-1 ml-64 overflow-y-auto p-8">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          🚖 Transport Admin Panel
        </h1>

        <LiveBookings />
        {/* <DriverTracking /> */}

      </div>
    </div>
  );
}