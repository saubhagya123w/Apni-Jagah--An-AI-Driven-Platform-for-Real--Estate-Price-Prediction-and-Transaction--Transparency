import React from 'react';
import Navbar from './Navbar';

export default function About() {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3750272/pexels-photo-3750272.jpeg?auto=compress&cs=tinysrgb&w=800')",
      }}
    >
      <Navbar />
      <section className="text-white body-font pt-16 px-5 py-8">
        <div className="container mx-auto rounded-lg shadow-lg p-8">
          {/* About Us Section */}
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="text-3xl font-semibold text-white">About Us</h1>
            <p className="text-lg text-white mt-6 max-w-3xl mx-auto">
            Empowering property decisions through smart tech, our platform offers tools like real-time price prediction, intelligent neighborhood comparison, and curated listing insights. Whether you're selling, buying, or exploring, features like Predict My Nest, Nest&Lense, and Around Prop Worth help you understand the market better. List your property effortlessly, compare areas with AI, and make confident moves in India’s most vibrant cities — all in one streamlined space.
            </p>
          </div>

          {/* Our Services Section */}
          <div className="flex flex-col text-center w-full mb-8">
            <h2 className="text-2xl font-medium text-white">Our Services</h2>
          </div>

          {/* Services Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* Service 1 */}
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
                <img
                  alt="Price Comparison"
                  className="rounded-t-lg w-full h-56 object-cover mb-4"
                  src="https://media.istockphoto.com/id/1360480497/photo/wooden-house-and-golden-coin-on-balancing-scale-on-white-background-real-estate-business.jpg?s=612x612&w=0&k=20&c=WSaYE2yi0uVjUch0dVlVWLglgpaiLWIStN3vT31PLGM="
                />
                <div className="w-full p-4">
                  <h3 className="text-xl font-medium text-black">Properties</h3>
                  <p className="text-sm text-gray-700 mt-2">
                  "A page where you can list your property for sale, featuring a smart price prediction model that automatically estimates the listing price and posts it on the Properties page."
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
                <img
                  alt="Property Verification"
                  className="rounded-t-lg w-full h-56 object-cover mb-4"
                  src="https://images.pexels.com/photos/7937225/pexels-photo-7937225.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
                <div className="w-full p-4">
                  <h3 className="text-xl font-medium text-black">Sell Property</h3>
                  <p className="text-sm text-gray-700 mt-2">
                  "A page where you can list your property for sale, featuring a smart price prediction model that automatically estimates the property's value and posts it on the Properties page with the predicted price."
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
                <img
                  alt="Secure Token Payment"
                  className="rounded-t-lg w-full h-56 object-cover mb-4"
                  src="https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
                <div className="w-full p-4">
                  <h3 className="text-xl font-medium text-black">Predict My Nest</h3>
                  <p className="text-sm text-gray-700 mt-2">
                   Predicts the price of your property for informed decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
                <img
                  alt="Chatbot Support"
                  className="rounded-t-lg w-full h-56 object-cover mb-4"
                  src="https://media.istockphoto.com/id/1332470097/photo/magnifying-glass-focusing-a-modern-apartment-building-facade.jpg?b=1&s=612x612&w=0&k=20&c=zf6K1OsLKXcbb4aEuHOD-XTAop34bgDyP_ou50Aqo1g="
                />
                <div className="w-full p-4">
                  <h3 className="text-xl font-medium text-black">Nest&Lense</h3>
                  <p className="text-sm text-gray-700 mt-2">
                    Get help instantly through our AI based location comparison tool that recommends the best locations based on ratings, Price per square feet.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
                <img
                  alt="Nearby Insights"
                  className="rounded-t-lg w-full h-56 object-cover mb-4"
                  src="https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
                <div className="w-full p-4">
                  <h3 className="text-xl font-medium text-black">Around Prop Worth</h3>
                  <p className="text-sm text-gray-700 mt-2">
                    Find nearby listings, amenities, and trends in your selected area for smarter decision-making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


