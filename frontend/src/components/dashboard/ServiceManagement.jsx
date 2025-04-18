import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PARTNER_API_END_POINT } from "../../utils/constent";
import { useSelector } from "react-redux";

const SERVICE_TYPES = [
  "Hair", "Makeup", "Spa", "Nails", 
  "Facial", "Massage", "Skincare", "Waxing", "Other"
];

const SERVICE_CATEGORIES = ["Men's", "Women's", "Both"];

function ServiceManagement() {
  const [services, setServices] = useState([]);
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
      const response = await axios.get(`${PARTNER_API_END_POINT}/getServicesOfPartner`, {
        params: { partnerId: partner?._id },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) setServices(response.data.services);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching services");
    }
  };

  useEffect(() => { fetchAllServices(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, serviceImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const response = await axios.post(
        `${PARTNER_API_END_POINT}/partner/addServices`,
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Service added successfully");
        fetchAllServices();
        setFormData({
          name: "", description: "", price: "", serviceImage: "",
          partnerId: partner?._id, availableAtHome: false,
          serviceType: "", duration: "", serviceCategory: ""
        });
        setImagePreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding service");
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Service Management
      </h1>

      <div className="w-full">
        {/* Tabs */}
        <div className="grid grid-cols-2 mb-6 rounded-lg overflow-hidden border">
          <button
            onClick={() => setActiveTab("all-services")}
            className={`p-3 text-sm sm:text-base font-medium transition-colors ${
              activeTab === "all-services" 
                ? "bg-black text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveTab("add-service")}
            className={`p-3 text-sm sm:text-base font-medium transition-colors ${
              activeTab === "add-service" 
                ? "bg-black text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Add New Service
          </button>
        </div>

        {activeTab === "all-services" && (
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-600">
                  No services found
                </h3>
                <p className="mt-2 text-gray-500">
                  Add your first service to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={service.serviceImage || "/placeholder.svg"}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      {service.serviceType && (
                        <span className="absolute top-2 right-2 px-3 py-1 bg-black/80 text-white text-xs sm:text-sm rounded-full">
                          {service.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start pb-3">
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {service.name}
                        </h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          ₹{service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {service.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Duration:</span>{" "}
                          {service.duration} mins
                        </div>
                        <div>
                          <span className="font-medium">Category:</span>{" "}
                          {service.serviceCategory}
                        </div>
                      </div>
                      {service.availableAtHome && (
                        <div className="mt-3 flex items-center text-green-600 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
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
                          Available at home
                        </div>
                      )}
                      <div className="flex justify-end gap-2 mt-4">
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50">
                          Edit
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100">
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
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Add New Service
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-5">
                {/* Service Name */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select service type</option>
                    {SERVICE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select category</option>
                    {SERVICE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Available at Home */}
                <div className="flex items-center">
                  <input
                    id="availableAtHome"
                    name="availableAtHome"
                    type="checkbox"
                    checked={formData.availableAtHome}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="availableAtHome" className="ml-3 text-sm sm:text-base text-gray-700">
                    Available at customer's home
                  </label>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Service Image
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('image').click()}
                        className="w-full py-8 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="w-8 h-8 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <span className="text-sm font-medium">Upload Image</span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 2MB
                        </span>
                      </button>
                    </div>

                    {/* Image Preview */}
                    <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Image Preview
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium"
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