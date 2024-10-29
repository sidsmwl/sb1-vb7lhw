import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Course } from '../types';

interface CheckoutModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  isOfferValid: boolean;
}

export function CheckoutModal({ course, isOpen, onClose, isOfferValid }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coupon: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Thank you for your purchase! You will receive an email with course access details.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800">Checkout</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.coupon}
              onChange={e => setFormData(prev => ({ ...prev, coupon: e.target.value }))}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Course Price:</span>
              <span className="font-semibold">
                ₹{isOfferValid ? course.offerPrice : course.originalPrice.toLocaleString()}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 
                rounded-lg hover:from-blue-600 hover:to-purple-700 transform transition-all focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}