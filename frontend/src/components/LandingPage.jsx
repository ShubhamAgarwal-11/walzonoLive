import { useState } from 'react';
import { Scissors, BookOpen, Sparkles, UserCircle } from 'lucide-react';
import Preloader from './Preload';
import { CheckCircle, Clock, Home, MessageSquare, Phone, Star, Truck, Wrench } from "lucide-react"


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  return (
    <>
        {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Scissors className="h-8 w-8 text-white mr-2" strokeWidth={2} />
              <span className="text-xl font-bold">Walzono</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-gray-300">Services</a>
              <a href="#how-it-works" className="hover:text-gray-300">How It Works</a>
              <a href="#about" className="hover:text-gray-300">About Us</a>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black py-4">
            <a href="#services" className="block px-4 py-2 hover:bg-gray-800">Services</a>
            <a href="#how-it-works" className="block px-4 py-2 hover:bg-gray-800">How It Works</a>
            <a href="#about" className="block px-4 py-2 hover:bg-gray-800">About Us</a>
            <a href="#contact" className="block px-4 py-2 hover:bg-gray-800">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Beauty Services at Your Doorstep
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Book expert beauty treatments in the comfort of your home
          </p>
          <button onClick={() => window.location.href = '/'} className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300">
            Book Now
          </button>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-16 bg-gray-50 text-black px-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <UserCircle className="h-16 w-16 mx-auto mb-4 text-black" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-2 text-black">Certified Professionals</h3>
            <p className="text-black">Experienced and verified beauty experts</p>
          </div>

          <div className="text-center p-6">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-black" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-2 text-black">Easy Booking</h3>
            <p className="text-black">Book your appointment in 3 simple steps</p>
          </div>

          <div className="text-center p-6">
            <Sparkles className="h-16 w-16 mx-auto mb-4 text-black" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-2 text-black">Premium Quality</h3>
            <p className="text-black">Hygienic products and equipment</p>
          </div>
        </div>
      </div>



      {/* service section */}
      <section id="services" className="py-16 bg-muted/50 px-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">Our Services</h2>
            <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
              We offer a wide range of professional home services to meet all your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Wrench className="h-10 w-10 text-black" />}
              title="Home Repairs"
              description="Professional repairs for plumbing, electrical, and general maintenance issues."
            />
            <ServiceCard
              icon={<Truck className="h-10 w-10 text-black" />}
              title="Cleaning Services"
              description="Deep cleaning, regular maintenance, and specialized cleaning services."
            />
            <ServiceCard
              icon={<Home className="h-10 w-10 text-black" />}
              title="Home Improvement"
              description="Painting, flooring, and renovation services to upgrade your living space."
            />
            <ServiceCard
              icon={<CheckCircle className="h-10 w-10 text-black" />}
              title="Pest Control"
              description="Effective and safe pest control solutions for your home."
            />
            <ServiceCard
              icon={<MessageSquare className="h-10 w-10 text-black" />}
              title="Consultation"
              description="Expert advice on home maintenance and improvement projects."
            />
            <ServiceCard
              icon={<Clock className="h-10 w-10 text-black" />}
              title="Emergency Services"
              description="24/7 emergency services for urgent home repair needs."
            />
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">How It Works</h2>
            <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
              Getting professional home services has never been easier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Book a Service</h3>
              <p className="text-black">Choose the service you need and select a convenient time slot.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Professional Arrives</h3>
              <p className="text-black">
                Our vetted professional will arrive at your doorstep at the scheduled time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Enjoy Quality Service</h3>
              <p className="text-black">Relax while our expert takes care of your home service needs.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/50 px-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              role="Homeowner"
              content="The cleaning service was exceptional. The team was thorough, professional, and left my home spotless. Highly recommended!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Brown"
              role="Apartment Resident"
              content="I had an emergency plumbing issue and they responded within an hour. The plumber was knowledgeable and fixed the problem quickly."
              rating={5}
            />
            <TestimonialCard
              name="Emily Davis"
              role="Property Manager"
              content="We've been using their services for multiple properties and the consistency and quality of work is outstanding. A reliable partner."
              rating={4}
            />
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-black text-white px-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold tracking-tight">Ready to transform your home?</h2>
              <p className="mt-4 text-white">
                Book a service today and experience the difference of professional home care.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <button className="inline-flex bg-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-black hover:transform hover:scale-105 h-11 px-8 w-full md:w-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
      

      {/* Contact Section */}
      <section id="contact" className="py-16 px-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-black">Contact Us</h2>
              <p className="text-black mb-8">
                Have questions or need more information? Reach out to us and we'll get back to you as soon as
                possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Phone</p>
                    <p className="text-black">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Email</p>
                    <p className="text-black">contact@homeserve.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Home className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Address</p>
                    <p className="text-black">123 Service Street, City, State 12345</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-black">
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Your name"
                      className="flex h-10 w-full rounded-md border bg-white text-black border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-black">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="flex h-10 w-full rounded-md bg-white text-black border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-black">
                    Subject
                  </label>
                  <input
                    id="subject"
                    placeholder="Subject"
                    className="flex h-10 w-full rounded-md border bg-white text-black border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    rows={5}
                    className="flex min-h-[80px] w-full bg-white text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-black justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
        
      <footer className="border-t py-8 bg-black px-20 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-white" />
                <span className="text-xl font-bold">Walzono</span>
              </div>
              <p className="text-sm mb-4">
                Professional home services at your doorstep. Quality, reliability, and satisfaction guaranteed.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" >Cleaning Services</a></li>
                <li><a href="#" >Home Repairs</a></li>
                <li><a href="#" >Home Improvement</a></li>
                <li><a href="#" >Pest Control</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" >About Us</a></li>
                <li><a href="#" >Careers</a></li>
                <li><a href="#" >Blog</a></li>
                <li><a href="#" >Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" >Terms of Service</a></li>
                <li><a href="#" >Privacy Policy</a></li>
                <li><a href="#" >Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Walzono. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
        
      )}
    </>
  );
}



function ServiceCard({ icon, title, description }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground text-black shadow-sm h-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="mb-2 text-black">{icon}</div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
      </div>
      <div className="p-6 pt-0">
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ name, role, content, rating }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground text-black shadow-sm h-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center gap-2 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-black text-black" />
          ))}
        </div>
      </div>
      <div className="p-6 pt-0">
        <p className="mb-4">"{content}"</p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">{name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
