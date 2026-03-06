import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [bookings,setBookings] = useState([]);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");

  useEffect(()=>{
    loadBookings();
  },[]);

  const loadBookings = async()=>{
    const res = await axios.get("http://127.0.0.1:3001/bookings");
    setBookings(res.data);
  };

  const total = bookings.length;

  const pending = bookings.filter(b=>b.status==="Pending").length;

  const approved = bookings.filter(b=>b.status==="Approved").length;

  const filteredBookings = bookings.filter(b=>{

    const matchSearch =
      b.pickup.toLowerCase().includes(search.toLowerCase()) ||
      b.drop.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filter==="All" || b.status===filter;

    return matchSearch && matchStatus;

  });

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🚕 Transport Admin Panel
      </h1>

      <h2 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h2>

      <p className="text-gray-500 mb-6">
        Manage live transport bookings
      </p>

      {/* STATS */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-black text-white p-6 rounded-xl">
          <p>Total Bookings</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="bg-yellow-400 p-6 rounded-xl">
          <p>Pending</p>
          <h2 className="text-3xl font-bold">{pending}</h2>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl">
          <p>Approved</p>
          <h2 className="text-3xl font-bold">{approved}</h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-6">

        <input
          placeholder="Search bookings..."
          className="flex-1 border p-3 rounded"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
        </select>

      </div>

      {/* BOOKINGS LIST */}

      <div className="space-y-4">

        {filteredBookings.map((b)=>(
          <div
            key={b.id}
            className="bg-white p-6 rounded-xl shadow flex justify-between"
          >

            <div>

              <h3 className="font-bold text-lg">
                {b.customerName || "Booking"}
              </h3>

              <p><b>Pickup:</b> {b.pickup}</p>
              <p><b>Drop:</b> {b.drop}</p>
              <p><b>Vehicle:</b> {b.vehicle}</p>

            </div>

            <div className="flex items-center">

              {b.status==="Approved" && (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
                  Approved
                </span>
              )}

              {b.status==="Pending" && (
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                  Pending
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}