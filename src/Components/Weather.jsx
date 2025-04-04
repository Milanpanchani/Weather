import React, { useEffect, useRef, useState } from "react";
import search1 from "../assets/search.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

// API key = d5763af970a04eb7ae142901250404

const Weather = () => {
  const [weather, setweather] = useState(false);
  const inputref = useRef();

  const search = async (city) => {
    if (city == "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_APP_ID
      }&q=${city}&aqi=no`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);

      setweather({
        name: data.location.name,
        humidity: data.current.humidity,
        windspeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        image: data.current.condition.icon,
        region: data.location.region,
        country: data.location.country,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clickhandle = () => {
    search(inputref.current.value);
    inputref.current.value = "";
  };

  return (
    <div>
      <div className="place-self-center my-5">
        <h1 className="text-4xl font-medium tracking-tight capitalize text-sky-900">
          weater data
        </h1>
      </div>
      <div className="bg-sky-500 px-4 py-4 rounded flex flex-col items-center">
        <div className="flex items-center gap-3">
          <input
            type="text"
            ref={inputref}
            className="bg-zinc-50 border-none outline-none rounded-lg px-3 py-1  "
            placeholder="Search"
          />
          {/* <img onClick={()=>search(inputref.current.value)} className= 'h-8 w-8 p-2 rounded-full bg-white' src={search1} alt="" srcset="" /> */}
          <img
            onClick={clickhandle}
            className="h-8 w-8 p-2 rounded-full bg-white"
            src={search1}
            alt="img"
            srcset={search1}
          />
        </div>
        {weather ? (
          <>
            <img
              className="w-20 h-20 my-3 "
              src={weather.image}
              alt=""
              srcset=""
            />
            <h1 className="text-5xl font-semibold text-white">
              {" "}
              {weather.temperature}&deg;C
            </h1>
            <h2 className="text-2xl font-medium text-white capitalize mt-4">
              {weather.name}
            </h2>
            <div className="flex items-center">
              <h3 className="text-sm text-white capitalize">
                {" "}
                {weather.region} <span>,</span>{" "}
              </h3>
              <h3 className="text-sm text-white capitalize">
                {" "}
                {weather.country}{" "}
              </h3>
            </div>
            <div className="flex items-center justify-between text-white w-full px-3 py-6">
              <div className="left flex items-start  gap-2 ">
                <img className="h-5 w-5 mt-2" src={humidity} alt="" srcset="" />
                <div>
                  <h2 className="text-md"> {weather.humidity} </h2>
                  <h2 className="text-xs">Humidity</h2>
                </div>
              </div>
              <div className="right flex items-start gap-2">
                <img className="h-5 w-5 mt-2" src={wind} alt="" srcset="" />
                <div className="">
                  <h2 className="text-md"> {weather.windspeed} </h2>
                  <h2 className="text-xs">Wind Speed</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
