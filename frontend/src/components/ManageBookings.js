import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/bookings")
      .then(res => setBookings(res.data));
  }, []);

  const deleteBooking = async (id) => {
    await axios.delete(`http://127.0.0.1:3001/bookings/${id}`);
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Bookings</h2>

      {bookings.map(b => (
        <div key={b.id} className="border p-3 mb-2 flex justify-between">
          <span>{b.pickup} → {b.drop}</span>

          {role === "master_admin" && (
            <button
              onClick={() => deleteBooking(b.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}