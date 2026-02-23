import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getWeather(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`
      );
      setWeather(response.data.current.feelslike_c);
    } catch (err) {
      setError("City not found or something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

      <div className="bg-white w-96 p-8 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition duration-300">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          🌤 Weather App
        </h1>

        <form onSubmit={getWeather} className="space-y-4">

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Check Weather
          </button>

        </form>

        {weather !== null && !error && (
  <div className="mt-6 bg-purple-100 p-5 rounded-xl shadow-inner">
    <h2 className="text-xl font-semibold text-gray-700 capitalize">
      {city}
    </h2>
    <p className="text-4xl font-bold text-purple-600 mt-2">
      {weather}°C
    </p>
  </div>
)}

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default WeatherApp;