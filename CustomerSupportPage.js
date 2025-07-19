import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaComments } from 'react-icons/fa';
import {BsQuestionCircleFill} from 'react-icons/bs'

const CustomerSupportPage = () => {
  
  
    return (
    
        <div className="container mx-auto p-8">
            {/* Hero Section */}
            <div className="bg-purple-600 text-white p-8 rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Customer Support - Available 24/7</h1>
                <p className="text-lg mb-2">We are here to assist you at any time of the day. Reach out to us via chat, phone, or email!</p>
                <p>Support is just a click away!</p>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {/* Phone Support */}
                <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
                    <FaPhoneAlt className="text-4xl text-purple-600 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Call Us</h2>
                    <p className="text-gray-600">Speak to one of our customer service representatives anytime.</p>
                    <p className="font-bold mt-2">+1-800-123-4567</p>
                </div>

                {/* Email Support */}
                <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
                    <FaEnvelope className="text-4xl text-purple-600 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Email Us</h2>
                    <p className="text-gray-600">Send us an email, and we will get back to you within 24 hours.</p>
                    <p className="font-bold mt-2">support@example.com</p>
                </div>

                {/* Live Chat Support */}
                <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
                    <FaComments className="text-4xl text-purple-600 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Live Chat</h2>
                    <p className="text-gray-600">Chat with us for instant support. We’re online 24/7.</p>
                    <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-full hover:bg-purple-700 transition-all">
                        Start Chat
                    </button>
                </div>
            </div>

            
            {/* FAQs Section */}
            <section className="my-10">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                <FAQItem
                    question="How can I reset my password?"
                    answer="You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions."
                />
                <FAQItem
                    question="Where can I track my order?"
                    answer="Once your order is dispatched, you'll receive an email with the tracking information."
                />
                <FAQItem
                    question="How can I contact customer support?"
                    answer="You can contact us via phone, email, or live chat. We're available 24/7."
                />
                </div>
            </section>      
        </div>
    )
}


// FAQ Item Component
const FAQItem = ({ question, answer }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <div className="flex items-center gap-3 mb-3">
          <BsQuestionCircleFill className="text-purple-600 text-xl" />
          <h3 className="text-lg font-semibold text-gray-700">{question}</h3>
        </div>
        <p className="text-gray-600">{answer}</p>
      </div>
    );
  };
  

export default CustomerSupportPage
