import Navbar from "../Pages/Homepage/Navbar"


const About = () => {
  return (

    <>
    <Navbar/>
    <div className="about-section mx-36">
        
        <div className="about-container">
            <div className="about-header">
                <h1 className="text-5xl font-semibold">Uber’s technology offerings</h1>
                <p className="my-5 text-gray-500">Changing how people can request rides and get from point A to point B is just the beginning.</p>
                <button className="bg-black h-[60px] w-[150px] rounded-xl text-white">Explore the app</button>
            </div>
            
            <div className="about-details">
                <h1 className="text-3xl">Uber apps, products, and other offerings</h1>
                <div className="about-para flex m-auto">
                    <p>Uber is a technology company whose mission is to reimagine the way the world moves for the better. Our technology helps us develop and maintain multisided platforms that match consumers looking for rides and independent providers of ride services, as well as with other forms of transportation, including public transit, bikes, and scooters.</p>
                    <p>We also connect consumers and restaurants, grocers, and other merchants so they can buy and sell meals, groceries, and other items, then we match them with independent delivery service providers. Plus, Uber connects shippers and carriers in the freight industry.</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default About