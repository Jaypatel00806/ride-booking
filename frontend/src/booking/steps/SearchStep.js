import { useState } from "react";
import { FaMapMarkerAlt, FaFlagCheckered, FaUsers, FaSearch } from "react-icons/fa";

export default function SearchStep({ next }) {
  const [form, setForm] = useState({});

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Search Ride
      </h2>

      {/* Pickup */}
      <div className="flex items-center border rounded-lg mb-3 p-2">
        <FaMapMarkerAlt className="text-indigo-500 mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Pickup location"
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
        />
      </div>

      {/* Drop */}
      <div className="flex items-center border rounded-lg mb-3 p-2">
        <FaFlagCheckered className="text-green-500 mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Drop location"
          onChange={(e) => setForm({ ...form, drop: e.target.value })}
        />
      </div>

      {/* Date */}
      <div className="border rounded-lg mb-3 p-2">
        <input
          type="datetime-local"
          className="w-full outline-none"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      {/* Passengers */}
      <div className="flex items-center border rounded-lg mb-4 p-2">
        <FaUsers className="text-indigo-500 mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Passengers"
          onChange={(e) => setForm({ ...form, passengers: e.target.value })}
        />
      </div>

      {/* Button */}
      <button
        onClick={() => next(form)}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
      >
        <FaSearch />
        Search Ride
      </button>

    </div>
  );
}