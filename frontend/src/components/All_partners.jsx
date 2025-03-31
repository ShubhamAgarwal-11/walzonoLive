"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Home, Star, Clock, Info, Plus, Minus, ShoppingCart, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "react-router"

// Import actions from your existing cart slice
import { addToCart, decreaseQuantity, selectCartItemById } from "../redux/cartSlice"
import axios from "axios"
import { SERVICE_API_END_POINT } from "../utils/constent"

// Custom UI Components
const Button = ({ children, className = "", size = "default", variant = "primary", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const sizeStyles = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  }
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variantStyles = {
    default: "bg-black text-primary-foreground hover:bg-gray-800/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center overflow-y-auto">
      <div className="fixed inset-0 z-50 bg-gray-600/80  transition-all duration-100" onClick={() => onOpenChange(false)} />
      <div className="z-50 grid w-full max-w-lg gap-4 rounded-b-lg border bg-white p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:data-[state=open]:slide-in-from-bottom-0">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

const DialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  )
}

const DialogTitle = ({ children, className = "", ...props }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h2>
  )
}

const DialogDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  )
}

const Alert = ({ variant = "default", children, className = "", ...props }) => {
  const variantStyles = {
    default: "bg-background text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  }

  return (
    <div
      className={`relative w-full rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const AlertDescription = ({ children, className = "", ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  )
}

export default function ServiceComponent() {
  const dispatch = useDispatch()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const { category } = useParams();

  // console.log("useParams :->",category)

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await axios.get(`${SERVICE_API_END_POINT}/getAllServicesByCategoryName`, { params: { service: category } })
        console.log(response.data)
        if (!response.data.success) {
          throw new Error(`Error: ${response.status}`)
        }
        setServices(response.data.services)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch services:", err)
        setError("Failed to load services. Please try again later.")
        // For demo purposes, load sample data if API fails
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Service Card Component
 const ServiceCard = ({ service }) => {
    const cartItem = useSelector((state) => selectCartItemById(state, service._id))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAddToCart = () => {
      dispatch(
        addToCart({
          id: service._id,
          parlourName: service.partnerId.parlourName,
          serviceName: service.name,
          price: service.price,
          image: service.serviceImage,
          description: service.description,
          rating: service.rating,
          duration: service.duration
        })
      )
      // console.log("service added to cart" , service.duration)
    }

    const handleRemoveFromCart = () => {
      dispatch(decreaseQuantity(service._id))
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-2 border-border hover:border-primary/20 cursor-pointer transition hover:scale-105 transition-all duration-300 bg-white text-black">
          <div className="relative">
            <img
              src={service.serviceImage || "/placeholder.svg?height=200&width=400"}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            {service.availableAtHome && (
              <Badge className="absolute top-3 right-3 bg-black text-white">
                <Home className="mr-1 h-3 w-3" /> Available at Home
              </Badge>
            )}
          </div>
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{service.name}</h3>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span className="text-sm font-medium">{service.rating}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{service.partnerId.parlourName}</p>

            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{service.duration}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">₹{service.price}</p>
              <button className="flex items-center border border-gray-400 hover:text-white hover:bg-black p-2 rounded-lg text-bold" onClick={() => setIsModalOpen(true)}>
                <Info className="h-4 w-4 mr-1" /> Details
              </button>
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0 flex justify-between items-center">
            {!cartItem ? (
              <button className="w-full flex items-center justify-center rounded-md border border-gray-200 bg-black text-white px-8 py-2 font-medium " onClick={handleAddToCart} >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </button>
            ) : (
              <div className="flex bg-black py-2 rounded-lg items-center justify-between w-full">
                <button onClick={handleRemoveFromCart} className="rounded-md  text-white px-4 font-medium ">
                  <Minus className="h-4 w-4" />
                </button>

                <span className="font-medium text-white mx-3">{cartItem.quantity}</span>

                <button onClick={handleAddToCart} className="rounded-md text-white px-4 font-medium ">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>{service.name}</DialogTitle>
              <DialogDescription>{service.partnerId.parlourName}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 bg-white">
              <div className="relative aspect-video">
                <img
                  src={service.serviceImage || "/placeholder.svg?height=300&width=500"}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-md"
                />
                {service.availableAtHome && (
                  <Badge className="absolute top-3 right-3 bg-green-700 text-gray-300">
                    <Home className="mr-1 h-3 w-3" /> Available at Home
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  <span>{service.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <p className="font-bold">${service.price}</p>
              </div>

              <p className="text-sm">{service.description}</p>

              {!cartItem ? (
                <button onClick={handleAddToCart} className="w-full flex items-center justify-center rounded-md border border-gray-200 bg-black text-white px-8 py-2 font-medium ">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </button>
              ) : (
                <div className="flex bg-black py-2 rounded-lg items-center justify-between">
                  <button onClick={handleRemoveFromCart} className="rounded-md text-white px-4 font-medium ">
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="font-medium text-white mx-3">{cartItem.quantity}</span>

                  <button onClick={handleAddToCart} className="rounded-md text-white px-4 font-medium ">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </motion.div>
    )
  }

  // Main render
  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Beauty Services
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading services...</span>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No services available at the moment.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </motion.div>
      )}
    </div>
  )
}