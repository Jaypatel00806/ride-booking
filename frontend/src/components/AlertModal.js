export default function AlertModal({ message, onClose }) {

  if (!message) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">

        <h2 className="text-lg font-semibold mb-4">
          {message}
        </h2>

        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          OK
        </button>

      </div>

    </div>

  );

}