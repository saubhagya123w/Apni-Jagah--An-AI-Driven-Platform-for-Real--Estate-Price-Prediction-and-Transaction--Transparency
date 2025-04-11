import React, { useState } from 'react';
import Navbar from './Navbar';
import cityLocations from './cityLocations';

const PropertyForm = () => {
  const [prediction, setPrediction] = useState(null);
  const [rate, setRate] = useState(null);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setRate(data.rate);
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong while fetching prediction.");
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setLocation('');
  };

  const formStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
    color: "#333",
    backdropFilter: "blur(10px)",
  };

  const buttonStyles = {
    backgroundColor: "#9c27b0",
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    fontSize: "16px",
  };

  const inputStyles = {
    backgroundColor: "#f5f5f5",
    border: "2px solid #ddd",
    padding: "10px 14px",
    borderRadius: "6px",
    width: "100%",
    fontSize: "14px",
    color: "#555",
    marginBottom: "12px",
  };

  const labelStyles = {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    color: "#333",
  };

  const resultStyles = {
    marginTop: "16px",
    padding: "14px",
    backgroundColor: "#f8f8f8",
    borderRadius: "6px",
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <Navbar />
      <div className='body bg-[url("https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=800")] bg-cover bg-center h-screen'>
        <h1 className='text-center pt-14 text-white font-bold text-2xl mb-6'>
          "Get the True Estimate of Your Property’s Value with Apni Jagah – No Profit, Just Accuracy!"
        </h1>
        <form onSubmit={handleSubmit} style={formStyles}>
          <div className="mb-4">
            <label style={labelStyles} htmlFor="inline-city">Select City</label>
            <select
              value={city}
              onChange={handleCityChange}
              style={inputStyles}
              id="inline-city"
              required
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="mb-4">
            <label style={labelStyles} htmlFor="inline-location">Select Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!city}
              style={inputStyles}
              id="inline-location"
              required
            >
              <option value="">Select a location</option>
              {cityLocations[city]?.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label style={labelStyles} htmlFor="inline-bhk">Enter BHK</label>
            <input
              type="number"
              name="bhk"
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              style={inputStyles}
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label style={labelStyles} htmlFor="inline-sqfeet">Enter Square Feet</label>
            <input
              type="number"
              name="squareFeet"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              style={inputStyles}
              min="120"
              required
            />
          </div>

          <button
            type="submit"
            style={buttonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#7b1fa2"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#9c27b0"}
          >
            Predict Price
          </button>

          {prediction && rate && (
            <div style={resultStyles}>
              Predicted Price: <span className='text-blue-700'>
                {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(prediction)}
              </span> | Rate: <span className='text-red-700'>
                {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(rate)}/sqft
              </span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default PropertyForm;
