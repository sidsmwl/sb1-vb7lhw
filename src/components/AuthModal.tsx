import React, { useState } from 'react';
import { X, Mail, Phone, Lock } from 'lucide-react';
import type { Course } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  isOfferValid: boolean;
}

const DEMO_USER = {
  email: 'asdf@gmail.com',
  password: 'asdfghjkl@'
};

const RAZORPAY_LINK = 'your-razorpay-link-here';

export function AuthModal({ isOpen, onClose, course, isOfferValid }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signin') {
      if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
        window.location.href = '/dashboard';
        return;
      }
      alert('Invalid credentials');
      return;
    }

    if (mode === 'signup') {
      if (!formData.email && !formData.phone) {
        alert('Please provide either email or phone number');
        return;
      }
      // In a real app, you would create the user account here
      window.open(RAZORPAY_LINK, '_blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address (Optional if phone provided)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional if email provided)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 
                rounded-lg hover:from-blue-600 hover:to-purple-700 transform transition-all focus:outline-none"
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>

            {mode === 'signin' ? (
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Don't have an account? Sign Up
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Already have an account? Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}