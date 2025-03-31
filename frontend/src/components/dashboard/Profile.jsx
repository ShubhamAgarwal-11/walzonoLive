import React, { useState } from 'react';
import { Save, Edit2, X, Clock, Calendar } from 'lucide-react';
import { PARTNER_API_END_POINT } from '../../utils/constent';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPartnerProfile } from '../../redux/partnerSlice';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const partner  = useSelector((store) => store.partner.partnerInfo);
  const partnerProfile  = useSelector((store) => store.partner?.partnerProfile?.profileInfo);
  const dispatch = useDispatch();
//   console.log(partner?._id);
    console.log("partnerProfile",partnerProfile);

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
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleDayToggle = (day) => {
    setTempData((prev) => ({
      ...prev,
      openingDays: prev.openingDays.includes(day)
        ? prev.openingDays.filter((d) => d !== day)
        : [...prev.openingDays, day],
    }));
  };

  const handleSave = async(e) => {
    e.preventDefault();
    setProfileData(tempData);
    // setIsEditing(false);
    // dispatch(clearProfile());
    try {

        if(partnerProfile === null || partnerProfile === undefined){
            const response = await axios.post(`${PARTNER_API_END_POINT}/partnerProfile`, tempData,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if(response.data.success){
                toast.success('Profile created successfully');
                dispatch(getPartnerProfile(response.data));
                setIsEditing(false);
            }else{
                toast.error('Profile creation failed');
            }
        }else{
            const response = await axios.put(`${PARTNER_API_END_POINT}/updatePartnerProfile`, tempData,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if(response.data.success){
                toast.success('Profile updated successfully');
                dispatch(getPartnerProfile(response.data));
                setIsEditing(false);
            }else{
                toast.error('Profile update failed');
            }
        }

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return error;
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl text-black mx-auto">
      <div className="bg-white rounded-xl text-black shadow-md overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-white">{profileData.parlourName || 'Company Name'}</h1>
                <p className="text-blue-100 mt-2">{profileData.email || 'Set up your profile'}</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit2 size={20} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Company Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={isEditing ? tempData.parlourName : profileData.parlourName}
                      onChange={(e) => setTempData({ ...tempData, parlourName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter company name"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input
                      type="text"
                      value={isEditing ? tempData.gstNo : profileData.gstNo}
                      onChange={(e) => setTempData({ ...tempData, gstNo: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter GST number"
                      className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={isEditing ? tempData.address : profileData.address}
                      onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter business address"
                      rows={3}
                      className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Bank Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={isEditing ? tempData.bankName : profileData.bankName}
                      onChange={(e) => setTempData({ ...tempData, bankName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter bank name"
                      className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={isEditing ? tempData.bankAccountNo : profileData.bankAccountNo}
                      onChange={(e) => setTempData({ ...tempData, bankAccountNo: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter account number"
                      className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={isEditing ? tempData.ifscCode : profileData.ifscCode}
                      onChange={(e) => setTempData({ ...tempData, ifscCode: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter IFSC code"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Clock size={24} className="text-blue-600" />
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                        <input
                          type="time"
                          value={isEditing ? tempData.openingTime : profileData.openingTime}
                          onChange={(e) => setTempData({ ...tempData, openingTime: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                        <input
                          type="time"
                          value={isEditing ? tempData.closingTime : profileData.closingTime}
                          onChange={(e) => setTempData({ ...tempData, closingTime: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Calendar size={24} className="text-blue-600" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Opening Days</label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => isEditing && handleDayToggle(day)}
                            disabled={!isEditing}
                            className={`px-4 py-2 bg-white rounded-full text-sm font-medium transition-colors ${
                              (isEditing ? tempData : profileData).openingDays.includes(day)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } ${!isEditing && 'cursor-default'}`}
                          >
                            {day}
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
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">PAN Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    value={isEditing ? tempData.panNo : profileData.panNo}
                    onChange={(e) => setTempData({ ...tempData, panNo: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter PAN number"
                    className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Name</label>
                  <input
                    type="text"
                    value={isEditing ? tempData.panName : profileData.panName}
                    onChange={(e) => setTempData({ ...tempData, panName: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter name as per PAN"
                    className="w-full px-4 bg-white py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
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