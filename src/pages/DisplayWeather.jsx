import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import axios from "axios";
import { toast } from "sonner";

const api_key = process.env?.REACT_APP_API_KEY;

const DisplayWeather = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState();
  const [weatherIcon, setWeatherIcon] = useState("/images/clear.png");
  const { cityname } = useParams();

  console.log(cityname);

  useEffect(() => {
    if (cityname) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api_key}&units=metric`;
      const promise = () =>
        new Promise((resolve, reject) =>
          axios
            .get(url)
            .then((res) => {
              resolve(res?.data);
              setWeatherData(res?.data);
            })
            .catch((err) => reject(reject(err)))
        );
      toast.promise(promise, {
        loading: `Searching for ${cityname}`,
        success: (data) => {
          return `Getting ${data?.name} weather data successfully`;
        },
        error: (data) => {
          return data?.message || "Some Error occured";
        },
      });
    }
  }, [cityname]);

  useEffect(() => {
    if (weatherData) {
      if (
        weatherData?.weather?.[0]?.icon === "01d" ||
        weatherData?.weather?.[0]?.icon === "01n"
      ) {
        setWeatherIcon("/images/clear.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "02d" ||
        weatherData?.weather?.[0]?.icon === "02n"
      ) {
        setWeatherIcon("/images/cloud.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "03d" ||
        weatherData?.weather?.[0]?.icon === "03n"
      ) {
        setWeatherIcon("/images/drizzle.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "04d" ||
        weatherData?.weather?.[0]?.icon === "04n"
      ) {
        setWeatherIcon("/images/drizzle.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "09d" ||
        weatherData?.weather?.[0]?.icon === "09n"
      ) {
        setWeatherIcon("/images/rain.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "10d" ||
        weatherData?.weather?.[0]?.icon === "10n"
      ) {
        setWeatherIcon("/images/rain.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "11d" ||
        weatherData?.weather?.[0]?.icon === "11n"
      ) {
        setWeatherIcon("/images/thunderstorm.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "13d" ||
        weatherData?.weather?.[0]?.icon === "13n"
      ) {
        setWeatherIcon("/images/snow.png");
      } else if (
        weatherData?.weather?.[0]?.icon === "50d" ||
        weatherData?.weather?.[0]?.icon === "50n"
      ) {
        setWeatherIcon("/images/mist.png");
      }
    }
  }, [weatherData]);

  return (
    <div className="bg-sky-400 flex h-screen justify-center items-center">
      <div className="bg-white flex flex-col w-80 rounded-lg border border-gray-300">
        <div className="flex items-center space-x-2 text-sky-400 text-xl font-bold py-3 px-5 w-fit">
          <FaArrowLeft
            className="cursor-pointer hover:animate-ping
            "
            onClick={() => navigate("/")}
          />
          <h1>Weather App</h1>
        </div>
        <div className="border-t border-gray-300 w-full" />
        <div className="flex flex-col space-y-2 items-center py-7">
          <img
            src={weatherIcon}
            alt={weatherData?.weather?.[0]?.description}
            width={150}
            className="animate-jump-in"
          />
          <h1 className="font-bold text-5xl pt-3 animate-bounce">
            {parseInt(weatherData?.main?.temp)}°C
          </h1>
          <h3 className="animate-fade-down">
            {weatherData?.weather?.[0]?.description}
          </h3>
          <div className="flex space-x-1 items-center animate-fade-up">
            <IoLocationOutline />
            <p>{`${weatherData?.name}, ${weatherData?.sys?.country}`}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 w-full grid grid-cols-2 h-14">
          <div className="flex justify-center items-center border-r border-gray-300 animate-fade-right hover:animate-wiggle">
            <LiaTemperatureHighSolid className="text-sky-400 text-[33px]" />
            <div className="flex flex-col -space-y-2">
              <p className="font-bold">
                {parseInt(weatherData?.main?.feels_like)}°C
              </p>
              <h4 className="text-xs">Feels like</h4>
            </div>
          </div>
          <div className="flex justify-center items-center animate-fade-left hover:animate-wiggle">
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
