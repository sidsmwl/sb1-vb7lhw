import React from 'react';
import { Clock, PlayCircle, CheckCircle } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isOfferValid: boolean;
  onBuy: (courseId: string) => void;
}

export function CourseCard({ course, isOfferValid, onBuy }: CourseCardProps) {
  const discount = Math.round(((course.originalPrice - course.offerPrice) / course.originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="relative">
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {discount}% OFF
        </div>
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <PlayCircle size={64} className="text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Clock size={18} />
          <span>{course.videoCount} Videos</span>
        </div>
        
        <div className="space-y-3 mb-6">
          {course.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</p>
            <p className="text-3xl font-bold text-gray-800">
              {isOfferValid ? `₹${course.offerPrice}` : `₹${course.originalPrice.toLocaleString()}`}
            </p>
          </div>
          {course.progress !== undefined && (
            <div className="w-20">
              <div className="text-sm text-gray-600 mb-1">Progress</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onBuy(course.id)}
          className="w-full py-3 px-6 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg
            hover:from-blue-600 hover:to-purple-700 transform transition-all focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-blue-500"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}