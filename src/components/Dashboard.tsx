import React from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { courses } from '../data/courses';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Billionaires Archive - Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {course.videos.map((video, index) => (
                    <div key={video} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Play className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Video {index + 1}</h3>
                          <p className="text-sm text-gray-500">{video}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}