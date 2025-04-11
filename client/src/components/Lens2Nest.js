import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Chatbot = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5002/api/get_locations")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const handleCompare = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5002/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: selectedLocations }),
      });
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error comparing locations:", error);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&w=800')",
      }}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 text-white">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-md">
          🏡 Compare Your desired Location
        </h1>

        <div className="bg-black bg-opacity-50 backdrop-blur-sm shadow-lg rounded-2xl p-6 sm:p-10 mb-10">
          <p className="text-xl font-semibold text-white mb-6 text-center">
            Select Locations to Compare in Mumbai:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => toggleLocation(location)}
                className={`w-full px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm hover:scale-105 text-center ${
                  selectedLocations.includes(location)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-10">
          <button
            onClick={handleCompare}
            disabled={loading || selectedLocations.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-200 shadow-lg disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare Locations"}
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">
              🏆 Best Property Suggestions
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {suggestions.map((prop, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transform transition-transform hover:scale-[1.02] text-gray-800"
                >
                  <p className="text-xl font-semibold mb-1 text-blue-900">
                    📍 {prop.location}
                  </p>
                  <p className="text-gray-700">
                    💰 <span className="font-medium">Price/sqft:</span> ₹{prop.price_per_sqft}
                  </p>
                  <p className="text-gray-700">
                    ⭐ <span className="font-medium">Rating:</span> {prop.rating}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
