import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5005/get-properties');
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center py-10 px-4"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2157404/pexels-photo-2157404.jpeg?auto=compress&cs=tinysrgb&w=800')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="bg-white/80 rounded-xl max-w-7xl mx-auto p-8 shadow-xl backdrop-blur-md">
          <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
            Available Properties
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              const imageUrl = `http://localhost:5005${property.image_path}`;

              return (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  <img
                    src={imageUrl}
                    alt="property"
                    className="w-full h-64 object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                    }}
                  />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-purple-700">{property.city}</h2>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                        ₹{property.predicted_price?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex justify-between text-sm text-gray-700">
                      <p><strong>BHK:</strong> {property.bhk}</p>
                      <p><strong>Area:</strong> {property.area} sqft</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>Rate:</strong> ₹{property.rate?.toLocaleString()} /sqft</p>
                    </div>
                    <hr className="my-2 border-t border-gray-200" />
                    <p className="text-sm text-gray-600 italic">{property.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
