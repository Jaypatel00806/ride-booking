import { FaCarSide, FaTaxi, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

const rides = [
  { name: "Mini", price: 200, eta: "5 min", icon: <FaTaxi size={28} /> },
  { name: "Sedan", price: 350, eta: "3 min", icon: <FaCarSide size={28} /> },
  { name: "SUV", price: 500, eta: "7 min", icon: <FaTruck size={28} /> },
];

export default function SelectRideStep({ next }) {
  return (
    <div>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Select Your Ride
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {rides.map((r) => (

          <motion.div
            key={r.name}
            onClick={() => next({ vehicle: r })}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="
            bg-gradient-to-br from-white to-gray-50
            border rounded-xl p-5
            shadow hover:shadow-xl
            transition cursor-pointer
            "
          >

            <div className="flex items-center justify-between mb-3">

              <div className="text-indigo-600">
                {r.icon}
              </div>

              <span className="text-sm text-gray-500">
                ETA {r.eta}
              </span>

            </div>

            <h3 className="text-lg font-bold">
              {r.name}
            </h3>

            <p className="text-indigo-600 text-xl font-bold mt-2">
              ₹{r.price}
            </p>

          </motion.div>

        ))}

      </div>

    </div>
  );
}