import { useState } from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Body from './components/Body'
import HeroSection from './components/HeroSection'
import Login from './components/Login'
import NotFoundPage from './components/404'
import Signup from './components/Signup'
import Temp from './components/Temp'
import {Toaster} from 'react-hot-toast'
import PartnersLandingPage from './components/partners_component/LandingPage'
import Add_Partners1 from './components/partners_component/v1/Add_Partners_Step1'
import Add_Partners2 from './components/partners_component/v1/Add_Partners_Step2'
import Add_Partners3 from './components/partners_component/v1/Add_Partners_Step3'
import ServicesByTypes from './components/ServicesByTypes'
import ServicesByGender from './components/ServicesByGender'
import Booking from './components/Booking'
import LandingPage from './components/LandingPage'
import Cart from './components/cart/Cart'
import ApplicationUnderReview from './components/partners_component/ApplicationUnderReview'
import AppDashBoard from './components/dashboard/AppDashBoard'
import PartnerRegistration from './components/partners_component/PartnerRegistration'
import OTPLogin from './components/partners_component/OTPLogin'
import PaymentOption from './components/PaymentOptions.jsx'
import BlogList from './components/blog/BlogList'

function App() {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Body/>,
      children : [
        {
          path : "/",
          element : <HeroSection/>
        },
        {
          path  : "*",
          element : <NotFoundPage/>
        },
        {
          path  : "/services/:category",
          element : <ServicesByTypes/>
        },
        {
          path : "/:gender",
          element : <ServicesByGender/>
        },
        {
          path : "/booking",
          element : <Booking/>
        },
        {
          path : "/temp",
          element : <Temp/>
        },
        {
          path : "/cart",
          element : <Cart/>
        },
        {
          path : "/applicationUnderReview",
          element : <ApplicationUnderReview/>
        },
        {
          path : "/payment-options",
          element : <PaymentOption/>
        },
        {
          path : "/blog",
          element : <BlogList/>
        },
        // {
        //   path : "/testing", 
        //   element : <ServiceList/>
        // }
        
      ]
    },
    {
      path : "/home",
      element : <LandingPage/>
    },
    {
      path  : "/login",
      element : <Login/>
    },
    {
      path  : "/signup",
      element : <Signup/>
    },
    {
      path : "/add-partners",
      element : <PartnersLandingPage/>
    },
    {
      path : "/partner-registration",
      element : <PartnerRegistration/>
    },
    {
      path : "/add-partner/step-1",
      element : <Add_Partners1/>
    },
    {
      path : "/add-partner/step-2",
      element : <Add_Partners2/>
    },
    {
      path : "/add-partner/step-3",
      element : <Add_Partners3/>
    },
    {
      path : "/partner/dashboard",
      element : <AppDashBoard/>
    },
    {
      path : "/partner/login",
      element : <OTPLogin/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </>
  )
} 

export default App