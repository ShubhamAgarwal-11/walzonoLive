// import React, { useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import {toast} from 'react-hot-toast'
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'

// const Signup = () => {
//   const [isOpen, setIsOpen] = useState(true); // Manage modal state
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const modalRef = useRef();
//   const {location} = useSelector(store => store.user);
//   const Navigate = useNavigate();

//   // Open and close modal
//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   const submitHandler = async(e) => {
//     e.preventDefault();
//     // console.log(email, password , phone, name);
//     try {
//       const response = await axios.post("http://localhost:4000/api/user/register", {name , email , password, phone },{
//         headers : {
//           "Content-Type" : "application/json"
//         },
//         withCredentials: true
//       });
//       console.log(response);
//       if(response.data.success){
//         console.log("here")
//         toast.success(response.data.message)
//         Navigate('/login')
//       }
//       console.log(response);

//     } catch (error) {
//         toast.error(error.response.data.message)
//         console.log(error)
//     }
//   };

//   return (
//     <div>
//       {/* Button to open the modal */}
//       {/* <button
//         onClick={toggleModal}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
//       >
//         Open Login
//       </button> */}

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div
//             ref={modalRef}
//             className="relative bg-[#f2c4d6] rounded-lg w-96 shadow-lg p-6 animate-fadeIn"
//           >
//             {/* Close Button */}
//             <button
//               onClick={toggleModal}
//               className="absolute top-3 right-3 text-black hover:text-gray-600 focus:outline-none"
//             >
//               ✕
//             </button>

//             {/* Title */}
//             <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
//               Create Account
//             </h2>

//             {/* Form */}
//             <form onSubmit={submitHandler}>

//             <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-black py-2"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                   placeholder="Enter your Name"
//                 />
//               </div>

//               {/* Email Input */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-black py-2"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               {/* Password Input */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-black   py-2"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white "
//                   placeholder="Enter your password"
//                 />
//               </div>


//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-black py-2"
//                 >
//                   Phone No
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                   placeholder="Enter your phone"
//                 />
//               </div>

//               {/* Submit Button */}
//               {/* <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//               >
//                 Login
//               </button> */}

//               <button 
//                 type = "submit"
//                 className="btn hover:bg-black hover:text-white w-full mt-4"
//                 >
//                     Signup
//                 </button>

//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;






import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const Navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };  
  
const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const submitHandler = async(e) => {
        e.preventDefault();
        // console.log(email, password , phone, name);
        try {
          const response = await axios.post("http://localhost:4000/api/user/user-register", {name , email , password, phone },{
            headers : {
              "Content-Type" : "application/json"
            },
            withCredentials: true
          });
          console.log(response);
          if(response.data.success){
            console.log("here")
            toast.success(response.data.message)
            Navigate('/login')
          }
          console.log(response);
    
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-gray-300 rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Create Account</h2>
        <form onSubmit={submitHandler}>
          {/* name */}
        <div className="mb-4">
            <label htmlFor="email" className="block text-black font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black placeholder:text-black bg-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your Name"
              required
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black placeholder:text-black bg-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black placeholder:text-black bg-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-black font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black placeholder:text-black bg-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your Phone"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full text-white bg-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
