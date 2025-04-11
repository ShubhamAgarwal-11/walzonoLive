import React, { useState } from 'react';
import { Link } from 'react-router';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { USER_API_END_POINT } from '../utils/constent';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async(e) => {
        e.preventDefault();
        console.log(email, password);
        try {
          const response = await axios.post(`${USER_API_END_POINT}/login`, {email , password},{
            headers : {
              "Content-Type" : "application/json"
            },
            withCredentials: true
          });
          if(response.data.success){
            // console.log("here")
            dispatch(getUser(response?.data?.user))
            toast.success(response.data.message)
            Navigate('/')
          }
          console.log(response);
    
        } catch (error) {
            // console.log("error section here")
            toast.error(error.response.data.message)
            // console.log(error.response.data.message)
        }
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-gray-300 rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Welcome to Beauty At Home</h2>
        <form onSubmit={submitHandler}>
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
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full text-white bg-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <Link
              to={'/signup'}
              className="w-full text-center text-black bg-gray-300 hover:text-white hover:bg-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;