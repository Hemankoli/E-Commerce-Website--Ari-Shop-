import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Install heroicons

export default function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[400px] text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Thank you for your purchase! Your order has been placed successfully.
          You will receive a confirmation email shortly.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}