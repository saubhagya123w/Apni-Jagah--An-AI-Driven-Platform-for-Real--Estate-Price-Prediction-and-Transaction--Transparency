import React, { useState } from 'react';
import Navbar from './Navbar';
import cityLocations from './cityLocations';

const SellProperty = () => {
  const [prediction, setPrediction] = useState(null);
  const [rate, setRate] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [location, setLocation] = useState('');
  const [bhk, setBhk] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setLocation('');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const predictData = new FormData();
    predictData.append('city', city);
    predictData.append('location', location);
    predictData.append('bhk', bhk);
    predictData.append('squareFeet', squareFeet);

    try {
      // ✅ Prediction server updated to port 5003
      const predictResponse = await fetch('http://localhost:5003/predict', {
        method: 'POST',
        body: predictData,
      });

      const predictResult = await predictResponse.json();

      if (predictResponse.ok) {
        setPrediction(predictResult.prediction);
        setRate(predictResult.rate);

        const sellData = new FormData();
        sellData.append('city', city);
        sellData.append('location', location);
        sellData.append('bhk', bhk);
        sellData.append('squareFeet', squareFeet);
        sellData.append('description', description);
        sellData.append('image', image);
        sellData.append('predicted_price', predictResult.prediction);
        sellData.append('rate', predictResult.rate);

        // ✅ Property submission server updated to port 5004
        const sellResponse = await fetch('http://localhost:5004/sell-property', {
          method: 'POST',
          body: sellData,
        });

        if (sellResponse.ok) {
          alert('Property submitted successfully!');
        } else {
          const error = await sellResponse.json();
          alert('Submission error: ' + error.error);
        }
      } else {
        alert('Prediction failed: ' + predictResult.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while submitting the property.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='bg-[url("https://plus.unsplash.com/premium_photo-1661481589064-347d73e24e23?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlJTIwZm9yJTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D")] bg-cover bg-center min-h-screen py-10 px-4'>
        <h1 className='text-white text-3xl font-bold text-center mb-8 drop-shadow-lg'>
          Sell Your Property on Apni Jagah
        </h1>
        <form
          onSubmit={handleSubmit}
          className='max-w-lg mx-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4'
          encType='multipart/form-data'
        >
          {/* Form fields remain unchanged */}
          <div>
            <label className='block font-semibold mb-1'>City</label>
            <select
              value={city}
              onChange={handleCityChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div>
            <label className='block font-semibold mb-1'>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
            >
              <option value="">Select a location</option>
              {cityLocations[city]?.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='block font-semibold mb-1'>BHK</label>
            <input
              type="number"
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              min="1"
              required
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <div>
            <label className='block font-semibold mb-1'>Square Feet</label>
            <input
              type="number"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              min="120"
              required
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <div>
            <label className='block font-semibold mb-1'>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded-md resize-none'
              rows={4}
            />
          </div>

          <div>
            <label className='block font-semibold mb-1'>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className='w-full border border-gray-300 rounded-md p-1 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-violet-600 file:text-white hover:file:bg-violet-700'
            />
          </div>

          <button
            type="submit"
            className='w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 font-semibold transition duration-300'
          >
            Predict & Submit
          </button>

          {prediction && rate && (
            <div className='mt-4 p-4 bg-gray-100 rounded-lg text-center'>
              <p className='font-semibold text-lg text-gray-700'>
                Predicted Price:{' '}
                <span className='text-blue-700'>
                  {Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(prediction)}
                </span>
              </p>
              <p className='font-semibold text-lg text-gray-700'>
                Rate:{' '}
                <span className='text-red-600'>
                  {Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(rate)} /sqft
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SellProperty;
