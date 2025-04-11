import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    // { icon: faTwitter, color: '#1DA1F2', link: '#' },
    { icon: faInstagram, color: '#E4405F', link: 'https://www.instagram.com/walzono_official' },
    { icon: faLinkedin, color: '#0A66C2', link: '#' },
    { icon: faFacebook, color: '#1877F2', link: '#' },
    // { icon: faYoutube, color: '#FF0000', link: '#' },
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.05, originX: 0 },
    tap: { scale: 0.95 },
  };

  // Create motion-wrapped Link components
  const MotionLink = motion(Link);
  const MotionA = motion.a;

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-black text-white pt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">WALZONO</h3>
            <div className="flex flex-col space-y-2">
              <MotionLink 
                to="/about" 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                About Us
              </MotionLink>
              <MotionLink 
                to="/contact" 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Contact Us
              </MotionLink>
              <MotionLink 
                to="/blog" 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Blog
              </MotionLink>
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">Legal</h3>
            <div className="flex flex-col space-y-2">
              <MotionLink 
                to="/privacy" 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Privacy Policy
              </MotionLink>
              <MotionLink 
                to="/terms" 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Terms of Service
              </MotionLink>
            </div>
          </div>

          {/* Social & Contact Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <MotionA
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
                  style={{ color: social.color }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                </MotionA>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <p className="flex items-center">
                <span className="mr-2">📧</span> walzonowithus@gmail.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span> +91 7878573321
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white border-opacity-20 mt-12 py-8">
          <div className="text-center text-opacity-80">
            <motion.p 
              whileHover={{ scale: 1.02 }}
              className="text-sm font-light"
            >
              © {new Date().getFullYear()} Walzono. All rights reserved.
              <br className="md:hidden" />
              <span className="mx-2 hidden md:inline-block">|</span>
              Designed with ❤️ in Your Location
            </motion.p>
            <div className="mt-4 flex justify-center space-x-4">
              <MotionLink 
                to="/privacy" 
                whileHover={{ y: -2 }}
                className="hover:text-purple-300 text-sm"
              >
                Privacy Policy
              </MotionLink>
              <MotionLink 
                to="/terms" 
                whileHover={{ y: -2 }}
                className="hover:text-purple-300 text-sm"
              >
                Terms of Service
              </MotionLink>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;