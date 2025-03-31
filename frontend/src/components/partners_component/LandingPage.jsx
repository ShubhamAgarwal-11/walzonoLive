import React, { useState } from "react";
import { VscPassFilled } from "react-icons/vsc";
import { IoIosPeople } from "react-icons/io";
import { FcConferenceCall } from "react-icons/fc";
import { FcDebt } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const testimonials = [
    {
      name: "Arshad Khan",
      title: "Owner - Khushboo biryani, Shillong",
      quote:
        "Zomato enabled me to restart my operations post-COVID when I had no hope of doing my business again. I'm grateful to the platform for helping me thrive - my online ordering business has done so well, it has even taken over my dining business!", // Replace with actual image path
    },
    {
      name: "Vijay",
      title: "Owner - Birgo, Coimbatore",
      quote:
        "Thanks to Zomato's invaluable support, our startup cloud kitchen has been doing wonders in the competitive food industry landscape. Their dedication to promoting local businesses and powerful reporting tools have been instrumental in our success, and we look forward to a long-term partnership.",
    },
    {
      name: "Sandeep K Mohan",
      title: "Owner - Mysore Raman Idli, Kerala",
      quote:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero tempore officia esse laborum quaerat consectetur nemo ipsa fuga eveniet molestias vel reprehenderit consequatur debitis, perferendis, inventore magni enim sapiente rerum saepe, maxime et neque iste? Esse a accusamus iste",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* navbar */}
      <nav className="bg-white shadow-md fixed w-full">
        <div className=" mx-20 px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Walzono</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-28 w-full text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Partner with Walzono
        </h1>
        <h2 className="text-4xl font-bold text-black mb-8">
          and grow your business
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          0% commission for the 3rd month for new parlour partners in selected
          cities
        </p>
        <div className="flex justify-center">
          <Link
            to={"/partner-registration"}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            Register your parlour
          </Link>
        </div>
      </div>

      {/* mid popup section */}
      {/* <div className='pb-20 w-3/4 mx-auto rounded-lg'>
        <div className="bg-white rounded-lg shadow-lg p-6 mt-10  mx-20 border border-gray-300">
            <h2 className="text-xl text-black font-bold mb-4">Get Started - It only takes 10 minutes</h2>
            <h2 className="text-xl text-gray-400 mb-4">Please be ready with the following for a smooth registration</h2>
            <div className='flex'>
                <span className='w-1/2'>
                  <div className='flex items-center p-2 text-xl text-black'> <VscPassFilled class="text-green-600 mr-2"/> PAN card</div>
                  <div className='flex items-center p-2 text-xl text-black'> <VscPassFilled class="text-green-600 mr-2"/> GST number</div>
                  <div className='flex items-center p-2 text-xl text-black'> <VscPassFilled class="text-green-600 mr-2"/> Bank account details</div>
                </span>
                <span className='w-1/2'>
                  <div className='flex items-center p-2 text-xl text-black'> <VscPassFilled class="text-green-600 mr-2"/> Images of your parlour</div>
                  <div className='flex items-center p-2 text-xl text-black'> <VscPassFilled class="text-green-600 mr-2"/> License</div>
                </span>
            </div>

        </div>
      </div> */}
      <div className="pb-20 w-full sm:w-3/4 mx-auto rounded-lg">
        <div className="bg-white rounded-lg shadow-lg p-6 mt-10 mx-4 sm:mx-20 border border-gray-300">
          <h2 className="text-xl text-black font-bold mb-4">
            Get Started - It only takes 10 minutes
          </h2>
          <h2 className="text-xl text-gray-400 mb-4">
            Please be ready with the following for a smooth registration
          </h2>
          <div className="flex flex-col sm:flex-row">
            <span className="w-full sm:w-1/2">
              <div className="flex items-center p-2 text-xl text-black">
                <VscPassFilled class="text-green-600 mr-2" /> PAN card
              </div>
              <div className="flex items-center p-2 text-xl text-black">
                <VscPassFilled class="text-green-600 mr-2" /> GST number
              </div>
              <div className="flex items-center p-2 text-xl text-black">
                <VscPassFilled class="text-green-600 mr-2" /> Bank account
                details
              </div>
            </span>
            <span className="w-full sm:w-1/2">
              <div className="flex items-center p-2 text-xl text-black">
                <VscPassFilled class="text-green-600 mr-2" /> Images of your
                parlour
              </div>
              <div className="flex items-center p-2 text-xl text-black">
                <VscPassFilled class="text-green-600 mr-2" /> License
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Why should you partner with us section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 pb-36">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Why should you partner with Glambook?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
          {/* Attract New Customers */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full">
                {/* <IoIosPeople size={70} class="text-green-500"/> */}
                <FcConferenceCall size={70} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black">
              Attract new customers
            </h3>
            <p className="text-md text-gray-600 ">
              Reach the millions of people on GlamBook
            </p>
          </div>

          {/* Doorstep Delivery Convenience */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full">
                <FcDebt size={70} />
              </div>
            </div>
            <h3 className="text-xl text-black font-semibold">
              Doorstep delivery convenience
            </h3>
            <p className="text-md text-gray-600">
              Easily get your orders delivered through our trained partners
            </p>
          </div>

          {/* Hotline Support */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full">
                <FcAssistant size={70} />
              </div>
            </div>
            <h3 className="text-xl text-black font-semibold">
              Hotline support
            </h3>
            <p className="text-md text-gray-600">
              On-call support for any issues or growth consultations
            </p>
          </div>
        </div>
      </div>

      {/* testimonial section */}

      <section className="py-16 px-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Partners success stories
          </h2>
          <div className="flex flex-wrap mx-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    {/* <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" /> */}
                    <FcBusinessman className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 italic min-h-36">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
