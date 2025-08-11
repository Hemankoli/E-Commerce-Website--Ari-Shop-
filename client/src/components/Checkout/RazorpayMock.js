// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const RazorpayMock = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('debit');
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//   });

//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
  
//   const handleOpenModal = () => {
//     setShowModal(true); 
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); 
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleCardDetailsChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayNow = () => {
//     alert(`Processing payment of ₹17,200 via ${paymentMethod}`);
//   };


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="payment-modal relative bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-6">
        
//         {/* Close Button */}
//         <button
//           onClose={handleCloseModal}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
//         >
//           &times;
//         </button>
        
//         {/* Header */}
//         <div className="modal-header flex justify-between items-center mb-6">
//           <div className="logo">
//             <h2 className="text-2xl font-bold">Jaivik Foundation</h2>
//             <p className="text-gray-500">Test Transaction</p>
//           </div>
//           <div className="amount text-green-500 font-bold text-2xl">₹17,200</div>
//         </div>

//         {/* Payment Methods */}
//         <div className="payment-methods mb-6">
//           <div className="mb-4">
//             <label className="block font-semibold">Preferred Payment Methods</label>
//             <div className="method-list mt-2">
//               <label className="method-item flex items-center mb-2">
//                 <input
//                   type="radio"
//                   value="debit"
//                   checked={paymentMethod === 'debit'}
//                   onChange={handlePaymentChange}
//                   className="mr-2"
//                 />
//                 Visa Debit card - 1111
//               </label>
//               <label className="method-item flex items-center mb-2">
//                 <input
//                   type="radio"
//                   value="credit"
//                   checked={paymentMethod === 'credit'}
//                   onChange={handlePaymentChange}
//                   className="mr-2"
//                 />
//                 Axis Credit card - 5449
//               </label>
//             </div>
//           </div>

//           {/* Card Input */}
//           {paymentMethod === 'debit' || paymentMethod === 'credit' ? (
//             <div className="card-input mb-4">
//               <h3 className="font-bold mb-2">Enter Card Details</h3>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 placeholder="Card Number"
//                 value={cardDetails.cardNumber}
//                 onChange={handleCardDetailsChange}
//                 className="w-full border p-2 rounded-md mb-2"
//               />
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   name="expiry"
//                   placeholder="MM/YY"
//                   value={cardDetails.expiry}
//                   onChange={handleCardDetailsChange}
//                   className="w-1/2 border p-2 rounded-md mb-2"
//                 />
//                 <input
//                   type="text"
//                   name="cvv"
//                   placeholder="CVV"
//                   value={cardDetails.cvv}
//                   onChange={handleCardDetailsChange}
//                   className="w-1/2 border p-2 rounded-md mb-2"
//                 />
//               </div>
//             </div>
//           ) : null}

//           {/* Other Payment Methods */}
//           <div className="other-methods mt-4">
//             <h3 className="font-bold">Other Payment Methods</h3>
//             <label className="method-item flex items-center mb-2">
//               <input
//                 type="radio"
//                 value="upi"
//                 checked={paymentMethod === 'upi'}
//                 onChange={handlePaymentChange}
//                 className="mr-2"
//               />
//               UPI/QR
//             </label>
//           </div>
//         </div>

//         {/* Pay Now Button */}
//         <button
//           onClick={handlePayNow}
//           className="pay-button w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
//         >
//           Pay ₹17,200
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RazorpayMock;
