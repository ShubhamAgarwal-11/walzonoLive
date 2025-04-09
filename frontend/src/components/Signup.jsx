
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
