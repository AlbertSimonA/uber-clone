import { useState, } from 'react';
import { Check, Bell, } from 'lucide-react';
import { useLocation } from 'react-router';

const Chooseride = () => {

  let location = useLocation();


  const [selectedRide, setSelectedRide] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  
  // Mock data that would normally come from location state
  // const mockData = {
  //   time: "15 min",
  //   distance: "5.2 km",
  //   price: {
  //     moto: 6.50,
  //     auto: 10.25,
  //     car: 15.75
  //   }
  // };

  const handleRideSelect = (rideType) => {
    setSelectedRide(rideType);
  };

  const handleConfirmRide = () => {
    if (selectedRide) {
      setIsConfirming(true);
      
      // Simulate API request delay
      setTimeout(() => {
        setIsConfirming(false);
        setShowNotification(true);
        
        // Auto hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }, 1500);
    }
  };

  const rideIcons = {
    moto: "🏍️",
    auto: "🛺",
    sedan: "🚗"
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-md mx-auto relative">
      {/* Notification overlay */}
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded mb-4 shadow-md flex items-center justify-between z-10">
          <div className="flex items-center">
            <Bell className="mr-2" size={20} />
            <div>
              <p className="font-bold">Request sent!</p>
              <p className="text-sm">Your {selectedRide} driver is on the way</p>
            </div>
          </div>
          <div className="bg-green-200 p-2 rounded-full">
            {rideIcons[selectedRide]}
          </div>
        </div>
      )}

      {/* Moto Option */}
      <button
        className={`border rounded-lg p-3 w-full hover:bg-gray-50 transition-all ${selectedRide === 'moto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        onClick={() => handleRideSelect('moto')}
      >
        <div className="flex items-center justify-between">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            🏍️
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Moto</h3>
              <p className="text-gray-500 text-sm">{location.state.time}</p>
              <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                {location.state.distance}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">₹{location.state.price.moto}</span>
            {selectedRide === 'moto' && <Check className="text-blue-500" size={20} />}
          </div>
        </div>
      </button>

      {/* Auto Option */}
      <button
        className={`border rounded-lg p-3 hover:bg-gray-50 transition-all ${selectedRide === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        onClick={() => handleRideSelect('auto')}
      >
        <div className="flex items-center justify-between">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            🛺
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Auto</h3>
              <p className="text-gray-500 text-sm">{location.state.time}</p>
              <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                {location.state.distance}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">₹{location.state.price.auto}</span>
            {selectedRide === 'auto' && <Check className="text-blue-500" size={20} />}
          </div>
        </div>
      </button>

      {/* Sedan Option */}
      <button
        className={`border rounded-lg p-3 hover:bg-gray-50 transition-all ${selectedRide === 'sedan' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        onClick={() => handleRideSelect('sedan')}
      >
        <div className="flex items-center justify-between">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            🚗
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Go Sedan</h3>
              <p className="text-gray-500 text-sm">{location.state.time}</p>
              <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                {location.state.distance}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">₹{location.state.price.car}</span>
            {selectedRide === 'sedan' && <Check className="text-blue-500" size={20} />}
          </div>
        </div>
      </button>

      {/* Confirm Button */}
      <button
        className={`mt-4 py-3 rounded-lg font-medium text-black transition-all ${
          selectedRide 
            ? isConfirming 
              ? 'bg-gray-300' 
              : 'bg-yellow-500 hover:bg-yellow-600' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
        disabled={!selectedRide || isConfirming}
        onClick={handleConfirmRide}
      >
        {isConfirming ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></div>
            Connecting...
          </span>
        ) : (
          `Confirm ${selectedRide && selectedRide.charAt(0).toUpperCase() + selectedRide.slice(1)}`
        )}
      </button>
    </div>
  );
};

export default Chooseride;

// export default Chooseride
