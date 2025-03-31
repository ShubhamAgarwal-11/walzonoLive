// // import React from 'react'
// // import { Link } from 'react-router'
// // import { useSelector } from 'react-redux'
// // import { useNavigate } from 'react-router'

// // const HeroSection = () => {

// //   const {user} = useSelector((state) => state.user)
// //   const Navigate = useNavigate();

// //   return (
// //     <div className="hero min-h-screen">
// //         <div className="hero-content flex-col lg:flex-row-reverse">
// //             <img
// //             // src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
// //             src='https://media.istockphoto.com/id/2177118708/photo/cosmetic-make-up-brush.jpg?s=612x612&w=0&k=20&c=wwyyOg5xSYpEcgLH-b02YdtaNG-ZM6hfdIbfBsHtQsw='
// //             className="max-w-sm rounded-lg shadow-2xl" />
// //             <div>
// //             <h1 className="text-5xl font-bold">Enhance Your Beauty</h1>
// //             <p className="py-6 text-lg" style={{fontFamily: 'cursive'}}>
// //               {/* "A seamless platform connecting customers with beauty parlors for personalized makeup services. Users can browse parlors, explore makeup categories like HD, Bridal, and Lite Makeup with pricing, and book appointments effortlessly for their preferred date and time." */}

// //               "Introducing a comprehensive platform designed to simplify makeup service bookings for customers and enhance visibility for beauty parlors. Users begin by creating an account, selecting their role as either a customer or a seller. As a customer, they gain access to a curated list of beauty parlors tailored to their preferences, complete with ratings, locations, and detailed profiles. Upon selecting a parlor, they can browse various makeup services, including HD Makeup, Bridal Makeup, and Lite Makeup, along with transparent pricing. Customers can then book an appointment seamlessly by choosing their desired service, date, and time. 

// //               For beauty parlors, the platform serves as an all-in-one solution to showcase their services, manage bookings, and connect with a broader audience. With its user-friendly interface, intuitive design, and efficient booking process, the platform ensures a smooth and delightful experience for both customers and sellers in the makeup and beauty industry."
        

// //             </p>
// //             {/* <button onClick={!user ? (Navigate('/login')) : (Navigate('/hello'))} className="btn hover:bg-black hover:text-white">Explore Now !!</button> */}
// //             <Link to={!user ? '/login' : '/hello'} className="btn hover:bg-black hover:text-white">Explore Now !!</Link>
// //             </div>
// //         </div>
// //     </div>
// //   )
// // }

// // export default HeroSection








// src/components/HomeContent.js
import React, {useState, useEffect} from "react";
import { FaCut, FaSpa, FaHandHoldingWater, FaSmile, FaWind, FaPaintBrush, FaLeaf, FaBaby } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVICE_API_END_POINT } from "../utils/constent";


const HomeContent = () => {

  const {user} = useSelector((state) => state.user)
  const [menServices, setMenServices] = useState([]);
  const [womenServices, setWomenServices] = useState([]);

  const services = [
    { icon: <FaCut className="text-xl text-black" />, label: "Haircuts" },
    // { icon: <FaSpa className="text-xl" />, label: "Spa Treatments" },
    // { icon: <FaHandHoldingWater className="text-xl" />, label: "Nail Care" },
    // { icon: <FaSmile className="text-xl" />, label: "Facials" },
    // { icon: <FaWind className="text-xl" />, label: "Blowouts" },
    { icon: <FaPaintBrush className="text-xl text-black" />, label: "Makeup" },
    { icon: <FaLeaf className="text-xl text-black" />, label: "Massages" },
    // { icon: <FaBaby className="text-xl" />, label: "Kids' Services" },
  ];


  const fetchBestServices = async () => {
    try {
      const response = await axios.get(`${SERVICE_API_END_POINT}/getBestServices`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,        
      })
      console.log(response)
      if (response.data.success) {
        setMenServices(response.data.menServices);
        setWomenServices(response.data.womenServices);
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchBestServices();
  }, [])
  
  return (      
      <div className="bg-gray-100">
        {/* {console.log("men",menServices)} */}
        <div className="relative bg-cover bg-center h-screen flex items-center justify-center">
          {/* Background image */}


          {/* <div className="diff h-screen">
            <div className="diff-item-1">
              <div className="bg-[#2D2D2D] text-[#FFC857] grid place-content-center text-9xl font-black">
                Walzono
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-[#FFC857] grid place-content-center text-9xl font-black">Walzono</div>
            </div>
            <div className="diff-resizer"></div>
          </div> */}

          <section className="">
              {/* <img src="https://res.cloudinary.com/daf7blofc/image/upload/v1737300676/download_kpmls4.webp" alt="background" className="absolute inset-0 object-cover w-full h-full filter blur-sm" /> */}
            
            <div className="absolute inset-0 flex items-center px-20 z-20">
              <div className="container">
                <div className="max-w-lg space-y-6">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Professional Home Services at Your Doorstep
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    From cleaning to repairs, we bring expert services to your home with just a few clicks.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="inline-flex bg-black items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-11 px-8 w-full sm:w-auto">
                      Book a Service
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black text-white hover:text-accent-foreground h-11 px-8 w-full sm:w-auto">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>



          

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          
        </div>


        {/* section 2 */}
        {/* <div className="bg-[#E5E7EB] px-4 py-4 w-full">
          <h2 className="text-2xl bg-[#E5E7EB] font-bold mb-4">Services Categories</h2>
          <div className='flex  justify-center items-center p-5 text-black w-full bg-[#E5E7EB]'>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className=" p-4 shadow-md rounded-lg w-full bg-white transition duration-500 hover:scale-105 mx-auto">
                <img src={service.img} alt={service.title} className="w-full h-48 object-cover mb-4 rounded mix-blend-multiply" />
                <h2 className="text-3xl w-full text-center p-4 font-bold">{service.title}</h2>
                <div className="flex items-center">
                  <p className="ml-2 text-lg">{service.service}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

        </div> */}

          {/* service section */}
          <div className="bg-[#F3F4F6] p-6 w-full rounded-md mx-auto shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Service Categories</h2>

              <div className="flex">
                {services.map((service, index) => (
                  <Link
                    to={!user ? '/login' : '/services/' + service.label}
                    key={index}
                    className="flex flex-col w-1/4 bg-[#ffffff] mx-auto items-center justify-center p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="text-primary mb-2">{service.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{service.label}</p>
                  </Link>
                ))}
            </div>
          </div>

        {/* Section 2 */}
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-4">Popular Services for Women's</h2>
          {/* <div className="flex space-x-4 mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded-md">All</button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">Today</button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">Tomorrow</button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">This week</button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">Next week</button>
            <button className="bg-gray-200 px-4 py-2 rounded-md">This month</button>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-white rounded-md shadow-md p-4 transition duration-500 hover:scale-105">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2m8fPpP2IgOJx2yQNsgpT-w4OTsd84h3FQ&s"
                alt="Glow Up (Bridal)"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Glow Up (Bridal)</h3>
              <p className="text-gray-600 mb-2">Smokey Eye (Evening)</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>

            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://img.freepik.com/premium-photo/young-woman-with-glowing-natural-makeup-look-including-dewy-skin-soft-eyeshadow-posing-against-clean-lightcolored-background_1229213-56597.jpg"
                alt="Beach Vibes"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Natural Look (Daytime)</h3>
              <p className="text-gray-600 mb-2">Charity Event Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://img.lovepik.com/photo/60180/7712.jpg_wh860.jpg"
                alt="City Lights"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Kids Party Makeup</h3>
              <p className="text-gray-600 mb-2">Kind  Light Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCQN8L7-oBFuBReEnKyc3-pGGpBfCrA_p9g&s"
                alt="Mountain Adventure"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">HD Makeup</h3>
              <p className="text-gray-600 mb-2">Heavy Duty Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-md shadow-md p-4 transition duration-500 hover:scale-105"
              >
                <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
              </div>
            ))}
          </div> */}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {womenServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all transform duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={service.serviceImage || "/placeholder.svg"}
                        alt={service.name}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      {service.serviceType && (
                        <span className="absolute top-2 right-2 px-2 py-1 bg-black/75 text-white text-xs rounded-full">
                          {service.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start pb-2">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                        ₹{service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">{service.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Duration:</span>
                          {service.duration} minutes
                        </div>
                        
                      </div>
                      {service.availableAtHome && (
                        <div className="mt-2 flex items-center text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                            />
                          </svg>
                          <span className="text-xs font-medium">Available at home</span>
                        </div>
                      )}
                      
                    </div>
                  </div>
                ))}
          </div>



        </div>



        {/* Section 3 */}
        <div className="container mx-auto px-4 py-20 bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Popular Services for Men's</h1>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2m8fPpP2IgOJx2yQNsgpT-w4OTsd84h3FQ&s"
                alt="Glow Up (Bridal)"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Glow Up (Bridal)</h3>
              <p className="text-gray-600 mb-2">Smokey Eye (Evening)</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://img.freepik.com/premium-photo/young-woman-with-glowing-natural-makeup-look-including-dewy-skin-soft-eyeshadow-posing-against-clean-lightcolored-background_1229213-56597.jpg"
                alt="Beach Vibes"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Natural Look (Daytime)</h3>
              <p className="text-gray-600 mb-2">Charity Event Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://img.lovepik.com/photo/60180/7712.jpg_wh860.jpg"
                alt="City Lights"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">Kids Party Makeup</h3>
              <p className="text-gray-600 mb-2">Kind of Light Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCQN8L7-oBFuBReEnKyc3-pGGpBfCrA_p9g&s"
                alt="Mountain Adventure"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-bold mb-1">HD Makeup</h3>
              <p className="text-gray-600 mb-2">Heavy Duty Makeup</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2">View Details</button>
            </div>
          </div> */}


            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {menServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all transform duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={service.serviceImage || "/placeholder.svg"}
                        alt={service.name}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      {service.serviceType && (
                        <span className="absolute top-2 right-2 px-2 py-1 bg-black/75 text-white text-xs rounded-full">
                          {service.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start pb-2">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                        ₹{service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">{service.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Duration:</span>
                          {service.duration} minutes
                        </div>
                        
                      </div>
                      {service.availableAtHome && (
                        <div className="mt-2 flex items-center text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                            />
                          </svg>
                          <span className="text-xs font-medium">Available at home</span>
                        </div>
                      )}
                      
                    </div>
                  </div>
                ))}
          </div>
          



        </div>
        {/* <hr class="border border-gray-300" /> */}


        {/* Section 4 */}

        <div className="container mx-auto bg-white my-full px-10 py-10">
          <h1 className="text-2xl font-bold mb-6">Top Beauty Parlours to follow</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJlYXV0eSUyMHBhcmxvdXJ8ZW58MHx8MHx8fDA%3D"
                alt="Beauty Bar"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">Beauty Bar</h2>
              <p className="text-gray-600">394 followers</p>
              <button className="bg-black text-white font-bold py-2 px-4 rounded-lg mt-4">
                Follow
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <img
                src="https://plus.unsplash.com/premium_photo-1676809172626-34d0538cc8e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlYXV0eSUyMHBhcmxvdXJ8ZW58MHx8MHx8fDA%3D"
                alt="Glamorous Beauty Lounge"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">Glamorous Beauty</h2>
              <p className="text-gray-600">250 followers</p>
              <button className="bg-black text-white font-bold py-2 px-4 rounded-lg mt-4">
                Follow
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <img
                src="https://img.freepik.com/free-photo/different-cosmetics-types-scattered-pink-table_23-2148046961.jpg"
                alt="The Glam Studio"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">The Glam Studio</h2>
              <p className="text-gray-600">180 followers</p>
              <button className="bg-black text-white font-bold py-2 px-4 rounded-lg mt-4">
                Follow
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <img
                src="https://plus.unsplash.com/premium_photo-1664048713210-9db5ee2a7e08?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXR5JTIwcGFybG91cnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Chic Beauty Spot"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">Chic Beauty Spot</h2>
              <p className="text-gray-600">300 followers</p>
              <button className="bg-black  text-white font-bold py-2 px-4 rounded-lg mt-4">
                Follow
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <img
                src="https://plus.unsplash.com/premium_photo-1681490823401-e5e56eb30c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGJlYXV0eSUyMHBhcmxvdXJ8ZW58MHx8MHx8fDA%3D"
                alt="Radiant Beauty Hub"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">Radiant Beauty Hub</h2>
              <p className="text-gray-600">400 followers</p>
              <button className="bg-black text-white font-bold py-2 px-4 rounded-lg mt-4">
                Follow
              </button>
            </div>
          </div>
        </div>
        

      </div>
  );
};

export default HomeContent;




