import axios from "axios";
import Navbaaar from "../Pages/Navbaaar"
import { useEffect, useState } from "react";

const DriverDashboard = () => {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAcceptRide = async (rideId) => {
    try {
      await axios.post("http://localhost:8000/api/driver/accept-ride", { rideId })
      fetchAvilableRides()
    } catch (error) {
      console.log("error Fetching acept ride:", error);
      
    }
  }

  const fetchAvilableRides = async function() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/driver/get-allAvailableRides");
      setAllRides(response.data.ride);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAvilableRides();
    const interval = setInterval(fetchAvilableRides, 10000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="driver-dashboard">
      <Navbaaar/>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Available Rides</h2>
        {loading ? (
          <div className="text-center py-8">Loading available rides...</div>
        ) : allRides.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No rides available at the moment</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allRides.map((ride) => (
              <div key={ride._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">${ride.price}</div>
                  <div className="text-sm text-gray-500">{ride.distance}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-4 h-4 mt-1 rounded-full bg-green-500 flex-shrink-0"/>
                    <div className="ml-2 flex-1">
                      <div className="text-sm text-gray-600">Pickup</div>
                      <div className="text-sm font-medium">{ride.destinationFrom}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 mt-1 rounded-full bg-red-500 flex-shrink-0"/>
                    <div className="ml-2 flex-1">
                      <div className="text-sm text-gray-600">Dropoff</div>
                      <div className="text-sm font-medium">{ride.destinationTo}</div>
                    </div>
                  </div>
                </div>
                {ride.status !== "Accepted" && <button 
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {handleAcceptRide(ride._id)}}
                >
                  Accept Ride
                </button>}

                {ride.status === "Accepted" && <h2 className="text-green-600 text-lg text-center mt-2">Ride Accepted</h2>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard