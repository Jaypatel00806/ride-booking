import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AlertModal from "./components/AlertModal";
import EditBookingModal from "./components/EditBookingModal";

export default function AdminPanel() {

  const [bookings, setBookings] = useState([]);
  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [message, setMessage] = useState("");
  const [editBooking, setEditBooking] = useState(null);

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

  const filteredBookings = bookings.filter((b) => {

    const matchSearch =
      b.pickup.toLowerCase().includes(search.toLowerCase()) ||
      b.drop.toLowerCase().includes(search.toLowerCase()) ||
      (b.customerName || "").toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || b.status === filter;

    return matchSearch && matchFilter;

  });

  const addBooking = async () => {

    if (!form.pickup || !form.drop || !form.date || !form.customerName) {
      setMessage("Please fill required fields");
      return;
    }

    try {

      await axios.post("http://127.0.0.1:3001/bookings", form);

      setMessage("Booking added successfully");

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

    } catch {
      setMessage("Booking failed");
    }

  };

  const deleteBooking = async (id) => {

    try {

      await axios.delete(`http://127.0.0.1:3001/bookings/${id}`);
      setMessage("Booking deleted");
      loadBookings();

    } catch {
      setMessage("Delete failed");
    }

  };

  const approveBooking = async (id) => {

    try {

      await axios.post(`http://127.0.0.1:3001/bookings/approve/${id}`);
      setMessage("Booking approved");
      loadBookings();

    } catch {
      setMessage("Approve failed");
    }

  };

  const updateBooking = async (updatedData) => {

    try {

      await axios.put(
        `http://127.0.0.1:3001/bookings/${editBooking.id}`,
        updatedData
      );

      setMessage("Booking updated");
      setEditBooking(null);
      loadBookings();

    } catch {
      setMessage("Update failed");
    }

  };

  return (

    <div className="flex h-screen bg-gray-100">

      <div className="w-64 fixed left-0 top-0 h-screen">
        <Sidebar role={role} />
      </div>

      <div className="flex-1 ml-64 p-8 overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          Manage Bookings
        </h1>

        <div className="flex gap-4 mb-6">

          <input
            placeholder="Search bookings..."
            className="flex-1 border p-3 rounded-lg shadow-sm"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg shadow-sm"
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
          </select>

        </div>

        {role === "master_admin" && (

          <div className="mb-6 grid grid-cols-7 gap-3 bg-white p-4 rounded-xl shadow">

            <input
              placeholder="Customer Name"
              value={form.customerName}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,customerName:e.target.value})}
            />

            <input
              placeholder="Pickup"
              value={form.pickup}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,pickup:e.target.value})}
            />

            <input
              placeholder="Drop"
              value={form.drop}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,drop:e.target.value})}
            />

            <input
              type="datetime-local"
              value={form.date}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,date:e.target.value})}
            />

            <input
              placeholder="Passengers"
              value={form.passengers}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,passengers:e.target.value})}
            />

            <input
              placeholder="Vehicle"
              value={form.vehicle}
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,vehicle:e.target.value})}
            />

            <button
              onClick={addBooking}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              Add Ride
            </button>

          </div>

        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Pickup</th>
                <th className="p-3 text-left">Drop</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Passengers</th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Status</th>
                {role === "master_admin" && (
                  <th className="p-3 text-left">Actions</th>
                )}
              </tr>

            </thead>

            <tbody>

              {filteredBookings.map((b)=>(

                <tr key={b.id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{b.customerName || "-"}</td>
                  <td className="p-3">{b.pickup}</td>
                  <td className="p-3">{b.drop}</td>

                  <td className="p-3">
                    {b.date ? new Date(b.date).toLocaleString() : "-"}
                  </td>

                  <td className="p-3">{b.passengers}</td>
                  <td className="p-3">{b.vehicle}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${b.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}>
                      {b.status}
                    </span>
                  </td>

                  {role === "master_admin" && (

                    <td className="p-3 flex gap-2">

                      {b.status !== "Approved" && (
                        <button
                          onClick={()=>approveBooking(b.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={()=>setEditBooking(b)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={()=>deleteBooking(b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

        <AlertModal
          message={message}
          onClose={() => setMessage("")}
        />

        <EditBookingModal
          booking={editBooking}
          onSave={updateBooking}
          onClose={() => setEditBooking(null)}
        />

      </div>

    </div>
  );
}