import { useState, useEffect } from "react";

export default function EditBookingModal({ booking, onSave, onClose }) {

  const [form, setForm] = useState({
    customerName: "",
    pickup: "",
    drop: "",
    date: "",
    passengers: "",
    vehicle: ""
  });

  useEffect(() => {
    if (booking) {
      setForm({
        customerName: booking.customerName || "",
        pickup: booking.pickup || "",
        drop: booking.drop || "",
        date: booking.date || "",
        passengers: booking.passengers || "",
        vehicle: booking.vehicle || ""
      });
    }
  }, [booking]);

  if (!booking) return null;

  const handleSave = () => {
    onSave(form);
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

      <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">

        <h2 className="text-xl font-bold mb-4">
          Edit Booking
        </h2>

        <div className="grid gap-3">

          <input
            className="border p-2 rounded"
            value={form.customerName}
            onChange={(e)=>setForm({...form,customerName:e.target.value})}
            placeholder="Customer Name"
          />

          <input
            className="border p-2 rounded"
            value={form.pickup}
            onChange={(e)=>setForm({...form,pickup:e.target.value})}
            placeholder="Pickup"
          />

          <input
            className="border p-2 rounded"
            value={form.drop}
            onChange={(e)=>setForm({...form,drop:e.target.value})}
            placeholder="Drop"
          />

          <input
            className="border p-2 rounded"
            value={form.passengers}
            onChange={(e)=>setForm({...form,passengers:e.target.value})}
            placeholder="Passengers"
          />

          <input
            className="border p-2 rounded"
            value={form.vehicle}
            onChange={(e)=>setForm({...form,vehicle:e.target.value})}
            placeholder="Vehicle"
          />

        </div>

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}