import React from 'react';
import Navbar from './Navbar';

export default function Developers() {
  const mentor = {
    name: 'Ms. Vandna Tomer',
    designation: 'Assistant Professor & Project Mentor',
  };

  const developers = [
    { name: 'Saubhagya Mishra', branch: 'CSE', section: 'CSE-IV', rollNo: '2101430100157', year: '4th Year' },
    { name: 'Rajat Chaudhary', branch: 'CSE', section: 'CSE-IV', rollNo: '2101430100140', year: '4th Year' },
    { name: 'Sagar Yadav', branch: 'CSE', section: 'CSE-IV', rollNo: '2101430100148', year: '4th Year' },
    { name: 'Saksham Pratap Rana', branch: 'CSE', section: 'CSE-IV', rollNo: '2101430100151', year: '4th Year' },
    { name: 'Prashant Pandey', branch: 'CSE', section: 'CSE-IV', rollNo: '2001430100158', year: '4th Year' },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/269063/pexels-photo-269063.jpeg?auto=compress&cs=tinysrgb&w=800')",
      }}
    >
      <Navbar />
      <div className="text-center pt-24 px-4 text-white drop-shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Meet the Developers
        </h1>
        <p className="text-lg mb-12 italic">
          Behind every great app is a great team.
        </p>
      </div>

      {/* Mentor Card */}
      <div className="flex justify-center mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-semibold text-blue-700 mb-3">Mentor</h2>
          <p className="text-xl font-medium text-gray-800">{mentor.name}</p>
          <p className="text-md text-gray-500 mt-1">{mentor.designation}</p>
        </div>
      </div>

      {/* Developers Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-md mb-10">Our Development Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm text-center hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{dev.name}</h3>
              <p className="text-gray-600 mt-3">Branch: <span className="font-medium">{dev.branch}</span></p>
              <p className="text-gray-600">Section: <span className="font-medium">{dev.section}</span></p>
              <p className="text-gray-600">Roll No: <span className="font-medium">{dev.rollNo}</span></p>
              <p className="text-gray-500 mt-1">{dev.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
