import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import lookup from "country-code-lookup";

const DisplayWeather = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(state?.data || {});

  useEffect(() => {
    if (state?.data) {
      setWeatherData(state?.data);
    }
  }, [state?.data]);

  return (
    <div className="bg-sky-400 flex h-screen justify-center items-center">
      <div className="bg-white flex flex-col w-80 rounded-lg border border-gray-300">
        <div
          className="flex items-center space-x-2 text-sky-400 text-xl font-bold py-3 px-5 cursor-pointer w-fit"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          <h1>Weather App</h1>
        </div>
        <div className="border-t border-gray-300 w-full" />
        <div className="flex flex-col space-y-2 items-center pb-8">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`}
            alt={weatherData?.weather?.[0]?.description}
          />
          <h1 className="font-bold text-5xl">
            {parseInt(weatherData?.main?.temp)}°C
          </h1>
          <h3>{weatherData?.weather?.[0]?.description}</h3>
          <div className="flex space-x-1 items-center">
            <IoLocationOutline />
            <p>{`${weatherData?.name}, ${
              lookup.byInternet("IN").country
                ? lookup.byInternet(weatherData?.sys?.country).country
                : weatherData?.sys?.country
            }`}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 w-full grid grid-cols-2 h-14">
          <div className="flex justify-center items-center border-r border-gray-300">
            <LiaTemperatureHighSolid className="text-sky-400 text-[33px]" />
            <div className="flex flex-col -space-y-2">
              <p className="font-bold">
                {parseInt(weatherData?.main?.feels_like)}°C
              </p>
              <h4 className="text-xs">Feels like</h4>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <WiHumidity className="text-sky-400 text-4xl" />
            <div className="flex flex-col -space-y-2">
              <p className="font-bold">{weatherData?.main?.humidity}%</p>
              <h4 className="text-xs">Humidity</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
