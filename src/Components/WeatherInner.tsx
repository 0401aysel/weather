import { useState } from "react";
import type { WeatherResponse, TMode } from "../Models/Model";
interface IProps {
  height: "up" | "down";
  handleDown: () => void;
  mode: TMode;
  weather: WeatherResponse | null;
}
export default function WeatherInner({
  height,
  handleDown,
  mode,
  weather,
}: IProps) {
  const current = weather?.list?.[0];
  const [date, setDate] = useState<"today" | "tomorrow" | "10days">("today");
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const todayWeather = weather?.list?.filter(
    (item) => new Date(item.dt_txt).toDateString() === todayDate.toDateString(),
  );

  const tomorrowWeather = weather?.list?.filter(
    (item) =>
      new Date(item.dt_txt).toDateString() === tomorrowDate.toDateString(),
  );

  const nextWeather = weather?.list?.filter(
    (item) =>
      new Date(item.dt_txt).toDateString() !== todayDate.toDateString() &&
      new Date(item.dt_txt).toDateString() !== tomorrowDate.toDateString(),
  );
  const data =
    date === "today"
      ? todayWeather
      : date === "tomorrow"
        ? tomorrowWeather
        : nextWeather;

  return (
    <>
      <div className="innerContainer">
        <div className="weather grid">
          <div className={`col1 currentWeather ${height}`}>
            <p>Current Weather</p>
            <p className="time">2:59PM</p>
            <p className="currentDropdown" onClick={handleDown}>
              Forenheight <img src={`/src/assets/${height}${mode}.svg`} />
            </p>
            <div className="currentHeight">
              <div className="currentInfo">
                <img
                  src={`http://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h1>
                  {current
                    ? Math.round(weather?.list[0].main.temp - 273.15)
                    : "--"}{" "}
                  <sup>&deg;f</sup>
                </h1>
                <p className="currentInner">
                  <span className="">
                    {current?.weather?.[0]?.description ?? "Loading..."}
                  </span>
                  <br></br>
                  Feels like{" "}
                  {current
                    ? Math.round(current.main.feels_like - 273.15)
                    : "--"}
                  <sup>&deg;f</sup>
                </p>
              </div>
              <p className="text">
                There will be mostly sunny day. May be change at night.
              </p>
            </div>
          </div>
          <div className="col3">
            <div className="weatherDetails">
              <div className="column1">
                <img src="" alt="" />
                <p>Air quality</p>
                <h3>{current?.weather?.[0]?.description}</h3>
              </div>
              <div className="column2">
                <img src="" alt="" />
                <p>Visibility</p>
                <h3>{current?.visibility}mi</h3>
              </div>
              <div className="column3">
                <img src="" alt="" />
                <p>Wind</p>
                <h3>{current?.wind.speed}mph</h3>
              </div>
              <div className="column4">
                <img src="" alt="" />
                <p>Humidity</p>
                <h3>{current?.main.humidity}%</h3>
              </div>
              <div className="column5">
                <img src="" alt="" />
                <p>clouds</p>
                <h3>{current?.clouds.all}%</h3>
              </div>
              <div className="column6">
                <img src="" alt="" />
                <p>Pressure</p>
                <h3>{current?.main.pressure}</h3>
              </div>
            </div>
          </div>
          <div className="col2">
            <div className="dayButtons">
              <button
                className={`${date === "today" ? "active" : ""}`}
                onClick={() => setDate("today")}
              >
                Today
              </button>
              <button
                className={`${date === "tomorrow" ? "active" : ""}`}
                onClick={() => setDate("tomorrow")}
              >
                Tomorrow
              </button>
              <button
                className={`${date === "10days" ? "active" : ""}`}
                onClick={() => setDate("10days")}
              >
                10 Days
              </button>
            </div>
            <div className="weatherList">
              {data?.map((item, index) => (
                <div key={index} className="item">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  />
                  <div>
                    <p className="time">
                      {date === "10days"
                        ? item.dt_txt.slice(0, 16)
                        : item.dt_txt.split(" ")[1].slice(0, 5)}
                    </p>
                    <p>{item.weather[0].description}</p>
                  </div>
                  <p>{Math.round(item.main.temp - 273.15)}°</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col4">col4</div>
        </div>
      </div>
    </>
  );
}
