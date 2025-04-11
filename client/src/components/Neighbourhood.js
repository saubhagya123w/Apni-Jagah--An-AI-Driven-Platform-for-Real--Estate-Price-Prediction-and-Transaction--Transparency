import React, { useState } from 'react';
import Navbar from './Navbar';
import cityLocations from './cityLocations';

const NeighbourhoodPredictor = () => {
  const [prediction, setPrediction] = useState(null);
  const [rate, setRate] = useState(null);
  const [listings, setListings] = useState([]);
  const [city, setCity] = useState('Mumbai');
  const [location, setLocation] = useState('');
  const [bhk, setBhk] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('city', city);
    formData.append('location', location);
    formData.append('bhk', bhk);
    formData.append('squareFeet', squareFeet);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5006'}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setRate(data.rate);
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong while fetching prediction.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className='min-h-screen bg-cover bg-center py-12 px-4'
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800')"
        }}
      >
        <div className="max-w-xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
          <h2 className='text-xl font-semibold text-center mb-4 text-purple-800'>Neighbourhood Price Predictor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div>
              <label className='font-medium block mb-1'>Select City</label>
              <select
                value={city}
                onChange={(e) => { setCity(e.target.value); setLocation(''); }}
                className='w-full border border-gray-300 rounded px-3 py-2 text-gray-700'
              >
                {Object.keys(cityLocations).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='font-medium block mb-1'>Select Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2 text-gray-700'
              >
                <option value="">Select a location</option>
                {cityLocations[city]?.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='font-medium block mb-1'>Enter BHK</label>
              <input
                type="number"
                min="1"
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2'
                required
              />
            </div>

            <div>
              <label className='font-medium block mb-1'>Enter Square Feet</label>
              <input
                type="number"
                min="120"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2'
                required
              />
            </div>

            <button type="submit" className='w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition'>
              Predict Price
            </button>
          </form>

          {prediction && rate && (
            <div className="mt-6 bg-gray-100 rounded p-4 shadow">
              <p className='text-lg font-medium text-center text-gray-700'>Predicted Price: <span className='text-green-600'>
                {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(prediction)}
              </span></p>
              <p className='text-center text-sm text-gray-500'>Avg Rate: {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(rate)} / sqft</p>
            </div>
          )}

          {listings.length > 0 && (
            <div className='mt-8'>
              <h3 className='text-md font-semibold mb-3 text-gray-800'>Neighbourhood Listings</h3>
              <div className='grid gap-4 sm:grid-cols-2'>
                {listings.map((listing, index) => (
                  <div key={index} className='p-4 bg-white shadow rounded border border-purple-100'>
                    <p className='text-sm text-gray-700'><strong>Location:</strong> {listing.location}</p>
                    <p className='text-sm text-gray-700'><strong>BHK:</strong> {listing.bhk}</p>
                    <p className='text-sm text-gray-700'><strong>Area:</strong> {listing.area} sqft</p>
                    <p className='text-sm text-gray-700'><strong>Price:</strong> ₹{listing.price.toLocaleString()}</p>
                    <p className='text-sm text-gray-700'><strong>Price/Sqft:</strong> ₹{listing.price_per_sqft.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NeighbourhoodPredictor;
