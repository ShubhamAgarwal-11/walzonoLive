import React, { useState, useEffect } from "react";
import { FaCut, FaSpa, FaHandHoldingWater, FaSmile, FaWind, FaPaintBrush, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SERVICE_API_END_POINT, PARTNER_API_END_POINT } from "../utils/constent";
import { useNavigate } from "react-router-dom";
import { setAllBestServicesForMen , setAllBestServicesForWomen, setTopServicesForMen , setTopServicesForWomen } from "../redux/serviceSlice";
import Preloader from "./Preload";

const HomeContent = () => {
  const { user } = useSelector((state) => state.user);
  const [menServices, setMenServices] = useState([]);
  const [womenServices, setWomenServices] = useState([]);
  const [allPartners , setAllPartners] = useState([]);
  const [topPartners , setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const services = [
    { icon: <FaPaintBrush className="text-3xl" />, label: "Makeup" },
    { icon: <FaCut className="text-3xl" />, label: "Hair" },
    { icon: <FaSmile className="text-3xl" />, label: "Facial" },
    { icon: <FaSpa className="text-3xl" />, label: "Spa Treatments" },
    { icon: <FaHandHoldingWater className="text-3xl" />, label: "Nail Care" },
    { icon: <FaWind className="text-3xl" />, label: "Blowouts" },
    { icon: <FaLeaf className="text-3xl" />, label: "Massages" },
  ];

  const fetchBestServices = async () => {
    try {
      const response = await axios.get(`${SERVICE_API_END_POINT}/getBestServices`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        setMenServices(response.data.menServicesTop5);
        setWomenServices(response.data.womenServicesTop5);

        dispatch(setAllBestServicesForMen(response.data.menServices));
        dispatch(setAllBestServicesForWomen(response.data.womenServices));
        dispatch(setTopServicesForMen(response.data.menServicesTop5));
        dispatch(setTopServicesForWomen(response.data.womenServicesTop5));

      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchPartners = async()=>{
    try {
      const response = await axios.get(`${PARTNER_API_END_POINT}/getAllPartners`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log("response ", response)
      if(response.data.success){
        setAllPartners(response.data.allPartners);
        setTopPartners(response.data.top5Partners)
      }
    } catch (error) {
      console.error('Error while fetching Partners List:- ', error);
    }
  }

  useEffect(() => {
    fetchBestServices();
    fetchPartners();
  }, []);

  const ServiceCard = ({ service, bgColor, type }) => (
    <div className={`relative group overflow-hidden cursor-pointer rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ${bgColor}`} onClick={()=> navigate(`${type}`)} >
      <div className="aspect-video relative overflow-hidden" >
        <img
          src={service.serviceImage || "/placeholder.svg"}
          alt={service.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-black rounded-full text-sm font-medium">
          ₹{service.price}
        </span>
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-black mb-2">{service.name}</h3>
        <p className="text-gray-700 line-clamp-2 mb-4">{service.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {service.duration} mins
          </span>
          {service.availableAtHome && (
            <span className="flex items-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              At Home
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        
        <div className="bg-white overflow-hidden">
          <style jsx>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .clip-path-wave { clip-path: ellipse(140% 100% at 50% 0%); }
            .service-hover:hover .service-icon {
              transform: rotateY(360deg);
              transition: transform 0.6s ease-in-out;
            }
          `}</style>
    
          {/* Enhanced Hero Section */}
          <section className="relative h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 opacity-75 bg-[url('https://res.cloudinary.com/daf7blofc/image/upload/v1744457829/wmremove-transformed_bgvfcl.jpg')] bg-cover bg-center"></div>
            <div className="container mx-auto px-4 md:px-8 relative z-10">
              <div className="max-w-2xl space-y-6 relative">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp text-black bg-clip-text">
                  Premium Home Services
                </h1>
                <p className="text-xl md:text-2xl text-black ">
                  Experience luxury delivered to your doorstep
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative">
                  {/* <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2">
                    <span>Book Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:border-white/60 transition-all group">
                    <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Explore Services
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute bottom-0 left-0 w-full clip-path-wave h-32 bg-white"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          </section>
    
          {/* Overlapping Service Categories */}
          <section className="relative z-10 -mt-32 pb-32">
            <div className="container mx-auto px-4 md:px-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                  <p className="text-gray-600 max-w-xl mx-auto ">Curated excellence for your lifestyle</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={!user ? '/login' : `/services/${service.label}`}
                      className="service-hover bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl flex flex-col items-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg border border-gray-200/50"
                    >
                      <div className="mb-4 text-white service-icon bg-gradient-to-br from-black to-gray-900 p-4 rounded-2xl">
                        {service.icon}
                      </div>
                      <span className="text-sm font-semibold text-center text-gray-800">{service.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
    
          {/* Women's Services with Diagonal Cut */}
          <section className="relative py-10 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-md">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Best Services For Women</h2>
                  <p className="text-gray-600 ">Elevated beauty experiences crafted for you</p>
                </div>
                <button onClick={() => navigate('/women')} className="mt-6 md:mt-0 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                  View All
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {womenServices.map((service) => (
                  <ServiceCard key={service._id} service={service} bgColor="bg-white shadow-xl" type="women" />
                ))}
              </div>
            </div>
          </section>
    
          {/* Men's Services with Angled Overlap */}
          <section className="relative py-28 bg-gray-900 text-white overflow-hidden">
            <div className="absolute -top-32 left-0 w-full h-32 transform rotate-3 bg-white/10"></div>
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-md">
                  <h2 className="text-4xl font-bold mb-2">Best Services For Men</h2>
                  <p className="text-gray-300 font-light">Premium grooming redefined</p>
                </div>
                <button onClick={() => navigate('/men')} className="mt-6 md:mt-0 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20">
                  View All
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {menServices.map((service) => (
                  <ServiceCard key={service._id} service={service} bgColor="bg-gray-800 shadow-xl" type="men" />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-32 left-0 w-full h-32 transform -rotate-3 bg-white/10"></div>
          </section>
    
          {/* Featured Salons with Parallax Effect */}
          <section className="relative py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Salons</h2>
                <p className="text-gray-600 font-light">Discover premium beauty destinations</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {topPartners.map((item) => (
                  <div key={item._id} onClick={() => navigate(`/salon/${item._id}`)} className="group relative overflow-hidden cursor-pointer rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <div className="aspect-square relative transform group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                      <img
                        src={item.parlourImage}
                        alt="Salon"
                        className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-6 left-6 text-white z-20">
                        <h3 className="text-xl font-bold">{item.parlourName}</h3>
                        <p className="text-sm font-light opacity-90">⭐{item.rating}</p>
                      </div>
                      <div className="absolute top-6 right-6 z-20">
                        <button className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-all shadow-md">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>

  );
};

export default HomeContent;