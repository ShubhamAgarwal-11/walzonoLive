// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='mt-auto'>
//         <footer className="footer bg-base-200 text-base-content p-10">
//   <nav>
//     <h6 className="footer-title">Services</h6>
//     <a className="link link-hover">Branding</a>
//     <a className="link link-hover">Design</a>
//     <a className="link link-hover">Marketing</a>
//     <a className="link link-hover">Advertisement</a>
//   </nav>
//   <nav>
//     <h6 className="footer-title">Company</h6>
//     <a className="link link-hover">About us</a>
//     <a className="link link-hover">Contact</a>
//     <a className="link link-hover">Jobs</a>
//     <a className="link link-hover">Press kit</a>
//   </nav>
//   <nav>
//     <h6 className="footer-title">Legal</h6>
//     <a className="link link-hover">Terms of use</a>
//     <a className="link link-hover">Privacy policy</a>
//     <a className="link link-hover">Cookie policy</a>
//   </nav>
//   <form>
//     <h6 className="footer-title">Newsletter</h6>
//     <fieldset className="form-control w-80">
//       <label className="label">
//         <span className="label-text">Enter your email address</span>
//       </label>
//       <div className="join">
//         <input
//           type="text"
//           placeholder="username@site.com"
//           className="input input-bordered join-item" />
//         <button className="btn btn-primary join-item">Subscribe</button>
//       </div>
//     </fieldset>
//   </form>
// </footer>
//     </div>
//   )
// }

// export default Footer


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Stay in touch with us</h2>
          <div className="flex gap-4">
            <a href="#" className="text-xl">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="mt-8">
            <form className="flex justify-center text-black bg-gray-300 rounded-lg items-center">
              <input
                type="text"
                className="placeholder:text-black w-full max-w-6xl px-6 py-4 bg-gray-400 text-black rounded-l-md focus:outline-none"
                placeholder="Search for service"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-[#111827] text-white font-medium rounded-r-md hover:bg-gray-900"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">About us</h2>
          <ul className="list-none">
            <li>
              <a href="#" className="hover:underline">
                About Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Media Kit
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers News
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">For Beauty Parlours</h2>
          <ul className="list-none">
            <li>
              <a href="#" className="hover:underline">
              Partnership Collaboration
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                List your parlour For
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                For Businesses
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Follow us</h2>
          <ul className="list-none">
            <li>
 <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center m-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
      <hr />
      <h1 className="text-4xl font-bold mt-6">Walzono</h1>
    </footer>
  );
};

export default Footer;