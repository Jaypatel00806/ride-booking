import { useState } from "react";
import SearchStep from "./steps/SearchStep";
import SelectRideStep from "./steps/SelectRideStep";
import PassengerStep from "./steps/PassengerStep";
import ReviewStep from "./steps/ReviewStep";
import ConfirmationStep from "./steps/ConfirmationStep";

export default function BookingFlow() {

  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const next = (values) => {
    setData({ ...data, ...values });
    setStep(step + 1);
  };

  const stepLabels = [
    "Search",
    "Ride",
    "Passenger",
    "Review",
    "Confirm"
  ];

  const steps = [
    <SearchStep next={next} />,
    <SelectRideStep next={next} />,
    <PassengerStep next={next} />,
    <ReviewStep next={next} data={data} />,
    <ConfirmationStep data={data} />,
  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8">

        {stepLabels.map((label, i) => (

          <div key={i} className="flex-1 flex flex-col items-center">

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
              ${step >= i + 1 ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              {i + 1}
            </div>

            <span className="text-xs mt-2">{label}</span>

          </div>

        ))}

      </div>

      {steps[step - 1]}

    </div>
  );
}