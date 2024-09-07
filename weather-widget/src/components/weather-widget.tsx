"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedLocation}&appid=817dca25ef085f4d1496f6f356abe0b9&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        location: data.name,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) {
        return `It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      return `${temperature}°${unit}`;
    }
  }

  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;

    return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/clouds-sky.jpg')" }}
    >
      <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white/90 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Weather Widget
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Search for the current weather conditions in your city.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 mt-4"
          >
            <Input
              type="text"
              placeholder="Enter a city name"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200"
            >
              {isLoading ? "Loading..." : "Search"}
            </Button>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {weather && (
            <div className="mt-6 grid gap-4">
              <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
                <ThermometerIcon className="w-6 h-6 text-red-500" />
                {getTemperatureMessage(weather.temperature, weather.unit)}
              </div>
              <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
                <CloudIcon className="w-6 h-6 text-blue-500" />
                {getWeatherMessage(weather.description)}
              </div>
              <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
                <MapPinIcon className="w-6 h-6 text-green-500" />
                {getLocationMessage(weather.location)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
