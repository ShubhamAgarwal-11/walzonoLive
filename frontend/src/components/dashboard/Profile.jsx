import React, { useState } from 'react';
import { Save, Edit2, X, Clock, Calendar } from 'lucide-react';
import { PARTNER_API_END_POINT } from '../../utils/constent';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getPartnerProfile } from '../../redux/partnerSlice';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const partner = useSelector((store) => store.partner.partnerInfo);
  const partnerProfile = useSelector((store) => store.partner?.partnerProfile?.profileInfo);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    partnerId: partner?._id,
    panNo: partnerProfile?.panNo || '',
    panName: partnerProfile?.panName || '',
    bankName: partnerProfile?.bankName || '',
    bankAccountNo: partnerProfile?.bankAccountNo || '',
    ifscCode: partnerProfile?.ifscCode || '',
    gstNo: partnerProfile?.gstNo || '',
    openingTime: partnerProfile?.openingTime || '',
    closingTime: partnerProfile?.closingTime || '',
    openingDays: partnerProfile?.openingDays || [],
    email: '',  
    address: partner?.address || '',
    parlourName: partner?.parlourName || 'Parlour Name',
  });

  const [tempData, setTempData] = useState(profileData);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleDayToggle = (day) => {
    setTempData((prev) => ({
      ...prev,
      openingDays: prev.openingDays.includes(day)
        ? prev.openingDays.filter((d) => d !== day)
        : [...prev.openingDays, day],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (!partnerProfile) {
        const response = await axios.post(`${PARTNER_API_END_POINT}/partnerProfile`, tempData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.data.success) {
          toast.success('Profile created successfully');
          dispatch(getPartnerProfile(response.data));
          setIsEditing(false);
        }
      } else {
        const response = await axios.put(`${PARTNER_API_END_POINT}/updatePartnerProfile`, tempData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.data.success) {
          toast.success('Profile updated successfully');
          dispatch(getPartnerProfile(response.data));
          setIsEditing(false);
        }
      }
      setProfileData(tempData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/50">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-3xl font-bold text-white">
                  {tempData.parlourName || 'Parlour Name'}
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  {tempData.email || 'Set up your profile'}
                </p>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
            {/* Company & Bank Details */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Company Details */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                  Company Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? tempData.parlourName : profileData.parlourName}
                      onChange={(e) => setTempData({ ...tempData, parlourName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={isEditing ? tempData.gstNo : profileData.gstNo}
                      onChange={(e) => setTempData({ ...tempData, gstNo: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={isEditing ? tempData.address : profileData.address}
                      onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                      disabled={!isEditing}
                      rows="3"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                  Bank Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? tempData.bankName : profileData.bankName}
                      onChange={(e) => setTempData({ ...tempData, bankName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={isEditing ? tempData.bankAccountNo : profileData.bankAccountNo}
                      onChange={(e) => setTempData({ ...tempData, bankAccountNo: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={isEditing ? tempData.ifscCode : profileData.ifscCode}
                      onChange={(e) => setTempData({ ...tempData, ifscCode: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                Business Hours
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Time Inputs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opening Time
                        </label>
                        <input
                          type="time"
                          value={isEditing ? tempData.openingTime : profileData.openingTime}
                          onChange={(e) => setTempData({ ...tempData, openingTime: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Closing Time
                        </label>
                        <input
                          type="time"
                          value={isEditing ? tempData.closingTime : profileData.closingTime}
                          onChange={(e) => setTempData({ ...tempData, closingTime: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening Days */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Days
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => isEditing && handleDayToggle(day)}
                            disabled={!isEditing}
                            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                              tempData.openingDays.includes(day)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } ${!isEditing ? 'cursor-default' : ''}`}
                          >
                            {day.substring(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PAN Details */}
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                PAN Details
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={isEditing ? tempData.panNo : profileData.panNo}
                    onChange={(e) => setTempData({ ...tempData, panNo: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Name
                  </label>
                  <input
                    type="text"
                    value={isEditing ? tempData.panName : profileData.panName}
                    onChange={(e) => setTempData({ ...tempData, panName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;