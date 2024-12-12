import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function DriverRegister() {

  var navigate = useNavigate()

  const [formData, setFormData] = useState({
    driverName: "",
    drivingLicense: "",
    adhaarCard: "",
    panCard: "",
    vehicle: ""
  });
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to an API or validate)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Get latitude and longitude
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          console.log("Form Data:", formData);
          setIsLoading(true);
          setErrorMSG("")
          await axios
            .post("http://localhost:8000/api/driver/driver-register", {
              formData,
              position
            })
            .then((res) => {
              if (res.status === 200) {
                // setUserInfo({ ...userInfo, mailConfirm: res.data.success });
                navigate("/to-dashboard")
                setIsLoading(false);
              }
            }).catch((error) => {
              setIsLoading(false);
              setErrorMSG(error.response.data.message)
            })
        },
        (error) => {
          setIsLoading(false);
          setErrorMSG(error.response.data.message);          
        }
      );
    } else {
      setIsLoading(false);
      setErrorMSG(error.response.data.message)
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="mx-3">
      {isLoading ? (
        <div className="inline-block">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-md mx-auto my-20 p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Athul</h1>
          <p className="text-gray-600 mt-2">
            Here's what you need to do to set up your account.
          </p>

          <h1 className="text-red-600">{errorMSG}</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* Driver Name */}
            <div className="flex flex-col">
              <label htmlFor="driverName" className="text-gray-900 font-medium">
                Name
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>

            {/*vehicle */}
            <div className="flex flex-col">
              <label htmlFor="vehicle" className="text-gray-900 font-medium">
                Vehicle
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
              >
                <option value="">Select a vehicle</option>
                <option value="Auto">Auto</option>
                <option value="Car">Car</option>
              </select>

            </div>

            {/* Driving License */}
            <div className="flex flex-col">
              <label htmlFor="drivingLicense" className="text-gray-900 font-medium">
                Driving License
              </label>
              <input
                type="text"
                id="drivingLicense"
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Enter your Driving License number"
              />
            </div>

            {/* Aadhaar Card */}
            <div className="flex flex-col">
              <label htmlFor="adhaarCard" className="text-gray-900 font-medium">
                Aadhaar Card
              </label>
              <input
                type="text"
                id="adhaarCard"
                name="adhaarCard"
                value={formData.adhaarCard}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Enter your Aadhaar Card number"
              />
            </div>

            {/* PAN Card */}
            <div className="flex flex-col">
              <label htmlFor="panCard" className="text-gray-900 font-medium">
                PAN Card
              </label>
              <input
                type="text"
                id="panCard"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Enter your PAN Card number"
              />
            </div>

            {/* <Link> */}
            <button
              type="submit"
              className="w-full bg-black text-white mt-4 py-2 px-4 rounded-md hover:bg-yellow-400 hover:text-black transition"
            >
              Submit
            </button>
            {/* </Link> */}

          </form>
        </div>
      )}

    </div>
  );
}

export default DriverRegister;

