import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function AdminPanel() {

  const [bookings, setBookings] = useState([]);
  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    customerName: "",
    pickup: "",
    drop: "",
    date: "",
    passengers: "",
    vehicle: "",
    phone: "",
    email: "",
    status: "Pending"
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await axios.get("http://127.0.0.1:3001/bookings");
    setBookings(res.data);
  };

  // STATS
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === "Pending").length;
  const approved = bookings.filter(b => b.status === "Approved").length;

  // SEARCH + FILTER
  const filteredBookings = bookings.filter((b) => {

    const matchSearch =
      b.pickup.toLowerCase().includes(search.toLowerCase()) ||
      b.drop.toLowerCase().includes(search.toLowerCase()) ||
      (b.customerName || "").toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || b.status === filter;

    return matchSearch && matchFilter;
  });

  // ADD BOOKING
  const addBooking = async () => {

    if (!form.pickup || !form.drop || !form.date || !form.customerName) {
      alert("Please fill required fields");
      return;
    }

    await axios.post("http://127.0.0.1:3001/bookings", form);

    setForm({
      customerName: "",
      pickup: "",
      drop: "",
      date: "",
      passengers: "",
      vehicle: "",
      phone: "",
      email: "",
      status: "Pending"
    });

    loadBookings();
  };

  // DELETE
  const deleteBooking = async (id) => {
    await axios.delete(`http://127.0.0.1:3001/bookings/${id}`);
    loadBookings();
  };

  // APPROVE
  const approveBooking = async (id) => {
    await axios.post(`http://127.0.0.1:3001/bookings/approve/${id}`);
    loadBookings();
  };

  // EDIT
  const updateBooking = async (b) => {

    const name = prompt("Customer Name", b.customerName);
    const pickup = prompt("Pickup", b.pickup);
    const drop = prompt("Drop", b.drop);
    const date = prompt("Date", b.date);
    const passengers = prompt("Passengers", b.passengers);
    const vehicle = prompt("Vehicle", b.vehicle);

    if (!pickup || !drop) return;

    await axios.put(`http://127.0.0.1:3001/bookings/${b.id}`, {
      customerName: name,
      pickup,
      drop,
      date,
      passengers,
      vehicle
    });

    loadBookings();
  };

  return (

    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen">
        <Sidebar role={role} />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6">
          🚕 Transport Admin Panel
        </h1>

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

        {/* INSERT FORM (MASTER ADMIN ONLY) */}
        {role === "master_admin" && (

          <div className="mb-6 grid grid-cols-7 gap-3">

            <input
              placeholder="Customer Name"
              value={form.customerName}
              className="border p-2"
              onChange={(e)=>setForm({...form,customerName:e.target.value})}
            />

            <input
              placeholder="Pickup"
              value={form.pickup}
              className="border p-2"
              onChange={(e)=>setForm({...form,pickup:e.target.value})}
            />

            <input
              placeholder="Drop"
              value={form.drop}
              className="border p-2"
              onChange={(e)=>setForm({...form,drop:e.target.value})}
            />

            <input
              type="datetime-local"
              value={form.date}
              className="border p-2"
              onChange={(e)=>setForm({...form,date:e.target.value})}
            />

            <input
              placeholder="Passengers"
              value={form.passengers}
              className="border p-2"
              onChange={(e)=>setForm({...form,passengers:e.target.value})}
            />

            <input
              placeholder="Vehicle"
              value={form.vehicle}
              className="border p-2"
              onChange={(e)=>setForm({...form,vehicle:e.target.value})}
            />

            <button
              onClick={addBooking}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Ride
            </button>

          </div>

        )}

        {/* TABLE */}

        <table className="w-full border bg-white">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Pickup</th>
              <th className="p-2">Drop</th>
              <th className="p-2">Date</th>
              <th className="p-2">Passengers</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Status</th>

              {role === "master_admin" && (
                <th className="p-2">Actions</th>
              )}

            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((b)=>(
              <tr key={b.id} className="border-t">

                <td className="p-2">{b.customerName || "-"}</td>
                <td className="p-2">{b.pickup}</td>
                <td className="p-2">{b.drop}</td>

                <td className="p-2">
                  {b.date ? new Date(b.date).toLocaleString() : "-"}
                </td>

                <td className="p-2">{b.passengers}</td>
                <td className="p-2">{b.vehicle}</td>
                <td className="p-2">{b.status}</td>

                {role === "master_admin" && (

                  <td className="p-2 flex gap-2">

                    <button
                      onClick={()=>approveBooking(b.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={()=>updateBooking(b)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>deleteBooking(b.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                )}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}