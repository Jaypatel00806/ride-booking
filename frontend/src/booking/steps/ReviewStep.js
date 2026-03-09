import axios from "axios";
import { useState } from "react";
import AlertModal from "../../components/AlertModal";

export default function ReviewStep({ data, next }) {

  const [error, setError] = useState("");

  const confirmBooking = async () => {

    try {

      await axios.post("http://127.0.0.1:3001/bookings", {

        pickup: data.pickup,
        drop: data.drop,
        date: data.date,
        passengers: data.passengers,
        vehicle: data.vehicle?.name,
        customerName: data.name,
        phone: data.phone,
        email: data.email,
        status: "Pending",

      });

      next({});

    } catch (err) {

      setError("Booking failed");

    }

  };

  return (

    <div>

      <h2 className="text-xl font-bold mb-4">
        Review Booking
      </h2>

      <button
        onClick={confirmBooking}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>

      <AlertModal
        message={error}
        onClose={() => setError("")}
      />

    </div>

  );

}