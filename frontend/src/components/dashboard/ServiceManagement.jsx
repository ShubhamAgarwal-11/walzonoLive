import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PARTNER_API_END_POINT } from "../../utils/constent";
import { useSelector } from "react-redux";

// Define service types
const SERVICE_TYPES = [
  "Hair",
  "Makeup",
  "Spa",
  "Nails",
  "Facial",
  "Massage",
  "Skincare",
  "Waxing",
  "Other"
];

// Define service categories
const SERVICE_CATEGORIES = [
  "Men's",
  "Women's",
  "Both"
];

function ServiceManagement() {
  const [services, setServices] = useState("");
  const [activeTab, setActiveTab] = useState("all-services");
  const partner = useSelector((store) => store.partner.partnerInfo);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    serviceImage: "",
    partnerId: partner?._id,
    availableAtHome: false,
    serviceType: "",
    duration: "",
    serviceCategory: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchAllServices = async () => {
    try {
      const partnerId = partner?._id;
      const response = await axios.get(`${PARTNER_API_END_POINT}/getServicesOfPartner`, {
        params: { partnerId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setServices(response.data.services);
      } else {
        return toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        serviceImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${PARTNER_API_END_POINT}/partner/addServices`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        fetchAllServices();
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          partnerId: partner?._id,
          availableAtHome: false,
          serviceType: "",
          duration: "",
          serviceCategory: "",
        });
        setImagePreview(null);
        return toast.success(response.data.message);
      } else {
        return toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Service Management</h1>

      <div className="w-full">
        <div className="grid w-full grid-cols-2 mb-8 border rounded-lg overflow-hidden">
          <button
            className={`py-2 px-4 text-center font-medium transition-colors ${
              activeTab === "all-services" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("all-services")}
          >
            All Services
          </button>
          <button
            className={`py-2 px-4 text-center font-medium transition-colors ${
              activeTab === "add-service" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("add-service")}
          >
            Add New Service
          </button>
        </div>

        {activeTab === "all-services" && (
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No services found</h3>
                <p className="mt-2">Add your first service to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={service.serviceImage || "/placeholder.svg"}
                        alt={service.name}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      {service.serviceType && (
                        <span className="absolute top-2 right-2 px-2 py-1 bg-black/75 text-white text-xs rounded-full">
                          {service.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start pb-2">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">{service.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Duration:</span>
                          {service.duration} minutes
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Category:</span>
                          {service.serviceCategory}
                        </div>
                      </div>
                      {service.availableAtHome && (
                        <div className="mt-2 flex items-center text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                            />
                          </svg>
                          <span className="text-xs font-medium">Available at home</span>
                        </div>
                      )}
                      <div className="flex justify-end gap-2 mt-4">
                        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-sm hover:bg-red-100 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "add-service" && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Add New Service</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter service name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border bg-white border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border bg-white border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service type</option>
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Service Category
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border bg-white border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {SERVICE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="Enter service duration"
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border bg-white border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your service"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="availableAtHome"
                      name="availableAtHome"
                      type="checkbox"
                      checked={formData.availableAtHome}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="availableAtHome" className="ml-2 block text-sm font-medium text-gray-700">
                      Available at customer's home
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Check this if you can provide this service at the customer's location
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Service Image
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <div className="mb-4 p-4 rounded-full bg-gray-100">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="mb-2 text-sm font-medium">Drag and drop or click to upload</p>
                      <p className="text-xs text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 2MB)</p>
                      <input
                        id="image"
                        name="serviceImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById("image").click()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Upload Image
                      </button>
                    </div>

                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">Image preview</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceManagement;