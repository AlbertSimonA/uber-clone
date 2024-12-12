import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Chooseride = () => {

  let navigate = useNavigate()

  const [allDriver, setAllDriver] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");

  useEffect(()=>{
    getAllDrivers()
   
  },[])

  const getAllDrivers = async()=>{
    await axios
    .get("http://localhost:8000/api/driver/get-allDrivers")
    .then((res) => {
      console.log(res.data.driver,"res.driverres.driverres.driver");
      
      setAllDriver(res.data.driver)
    }).catch((error) => {
      
      setErrorMSG(error.response.data.message)
    })
  }
  return (
    <div className="ride-section items-center">
      <div className="ride my-10 flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl">Choose a ride</h1>
        <h2 className="text-center text-xl">Recommended</h2>
        <div className="recommended-vehicles">

         {allDriver?.map((item)=>(
          <div className="recomendations my-10 cursor-pointer" onClick={()=>navigate(`/destination/${item.latitude},${item.longitude}`)}>
            <div className="car flex justify-between items-center gap-3">
              {item.vehicle == "Car" ?<img src="../images/ride.png" alt="" />:<img className="h-[200px] w-[200px]" src="../images/rideauto.png" alt="" />}
              <div className="car-details">
                <h1
                  className="font-bold text-2xl"

                >
                  {item.vehicle}
                </h1>
                <p>Driver Name : {item.driverName}</p>
                <button className=" text-white w-[70px] rounded-lg bg-blue-500">
                  Faster
                </button>
              </div>
              <h1 className="my-14 font-bold ">$ {Math.floor(Math.random() * 900) + 100}.{(Math.random()).toFixed(2).slice(2)}</h1>
            </div>
          </div>
         )) }

          {/* <div className="recomendations my-10">
            <div className="car flex justify-between items-center gap-3">
              <img className="h-[200px] w-[200px]" src="../images/rideauto.png" alt="" />
              <div className="car-details">
                <h1
                  className="font-bold text-2xl"
                >
                  Auto
                </h1>
                <p>2 mins away 05:21 Pm</p>
                <button className=" text-white w-[70px] rounded-lg bg-blue-500">
                  Faster
                </button>
              </div>
              <h1 className="my-14 font-bold ">$ 320.65</h1>
            </div>
          </div> */}

          {/* <div className="recomendations my-10">
            <div className="car flex justify-between items-center">
              <img src="../images/ride.png" alt="" />
              <div className="car-details">
                <h1
                  className="font-bold text-2xl"
                >
                  Go Sedan
                </h1>
                <p>2 mins away 05:21 Pm</p>
                <button className=" text-white w-[70px] rounded-lg bg-blue-500">
                  Faster
                </button>
              </div>
              <h1 className="my-14 font-bold ">$ 320.65</h1>
            </div>
          </div> */}
        </div>
    
        <div className="buttons flex ">
          <button className="bg-yellow-300 text-black rounded-lg h-12 w-[200px]">
            Cash
          </button>
          <button className="bg-black text-white rounded-lg h-12 w-[200px] mx-10">
            Request Valan Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chooseride;