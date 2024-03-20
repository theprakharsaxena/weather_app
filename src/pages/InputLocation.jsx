import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getDeviceLocation from "../components/getDeviceLocation";

const api_key = process.env?.REACT_APP_API_KEY;

function InputLocation() {
  const [cityname, setCityName] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log();
    if (cityname !== "") {
      navigate(`/${cityname}`);
    } else {
      if (cityname === "") {
        toast.warning(`Enter city name`);
      } else if (!api_key) {
        toast.warning(`API is missing`);
      } else {
        toast.error("Some Error occurred");
      }
    }
  };

  const handleGetDeviceLocation = () => {
    getDeviceLocation((location, error) => {
      if (error) {
        toast.error("Error getting location:", error);
      } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${api_key}&units=metric`;
        axios
          .get(url)
          .then((res) => {
            navigate(`/${res?.data?.name}`);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <>
      <div className="bg-sky-400 flex h-screen justify-center items-center">
        <div className="bg-white flex flex-col w-80 rounded-lg border border-gray-300">
          <h1 className="text-sky-400 text-xl font-bold py-3 px-5">
            Weather App
          </h1>
          <div className="border-t border-gray-300 w-full" />
          <div className="px-5 py-7">
            <input
              className="border border-gray-300 rounded placeholder:text-gray-400 p-2.5 w-full placeholder:text-center"
              type="text"
              value={cityname}
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleClick()}
              placeholder="Enter city name"
            />
            <div className="flex items-center space-x-4 w-full py-2.5">
              <div className="border-t border-gray-300 w-full" />
              <p className="text-gray-400">or</p>
              <div className="border-t border-gray-300 w-full" />
            </div>
            <button
              className="bg-sky-400 text-white p-2.5 w-full rounded"
              type="button"
              onClick={() => handleGetDeviceLocation()}
            >
              Get Device Location
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputLocation;
