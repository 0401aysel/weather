import { useEffect, useState } from "react";
import type { WeatherResponse, TMode, TMenu } from "../Models/Model";
import Header from "./Header";
import WeatherInner from "./WeatherInner";

function App() {
  const [mode, setMode] = useState<TMode>("light");
  const [menu, setMenu] = useState<TMenu>(null);
  const [city, setCity] = useState<string>("Baku");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [height, setHeight] = useState<"up" | "down">("down");

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  const getWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=20039690a1ba89e7573011f2a8300215`,
      );

      const data: WeatherResponse = await response.json();
      setWeather(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (weather?.city?.name?.toLowerCase() === city.toLowerCase()) {
      return;
    }
    getWeather(city);
  }

  return (
    <div className={`container ${mode}`}>
      <Header
        mode={mode}
        menu={menu}
        city={city}
        weatherdata={weather}
        onMenuClose={() => setMenu(null)}
        onMenuOpen={() => setMenu("show")}
        onCityChange={setCity}
        onSetMode={() => setMode(mode === "light" ? "dark" : "light")}
        onSubmit={handleSubmit}
      />
      <WeatherInner
        height={height}
        weather={weather}
        mode={mode}
        handleDown={() => setHeight(height === "down" ? "up" : "down")}
      />
    </div>
  );
}

export default App;
