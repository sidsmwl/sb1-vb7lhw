import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { CourseCard } from './components/CourseCard';
import { CountdownTimer } from './components/CountdownTimer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { courses } from './data/courses';

function App() {
  const [isOfferValid, setIsOfferValid] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  // Check if we're on the dashboard route
  const isDashboard = window.location.pathname === '/dashboard';
  if (isDashboard) {
    return <Dashboard />;
  }

  const handleBuy = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setShowAuth(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap size={32} />
              <h1 className="text-2xl font-bold">Billionaires Archive</h1>
            </div>
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold 
                hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 
                focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-12">
          <CountdownTimer onTimerEnd={() => setIsOfferValid(false)} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isOfferValid={isOfferValid}
              onBuy={handleBuy}
            />
          ))}
        </div>

        <AuthModal
          course={selectedCourse}
          isOpen={showAuth}
          onClose={() => {
            setShowAuth(false);
            setSelectedCourse(null);
          }}
          isOfferValid={isOfferValid}
        />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Billionaires Archive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;