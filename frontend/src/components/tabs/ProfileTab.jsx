import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit, User, Camera, Check, X, Lock, Eye, EyeOff } from 'lucide-react';

export default function ProfileTab({ 
  userData, 
  isEditingProfile, 
  setIsEditingProfile, 
  editedUser, 
  handleProfileChange, 
  saveProfileChanges 
}) {
  // State for password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for password validation and visibility
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Handle password field changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // Clear errors when typing
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: null
      });
    }
  };
  
  // Validate passwords before saving
  const validatePasswords = () => {
    const errors = {};
    
    // Current password is always required when changing password
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (passwordData.newPassword && passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    
    if (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle save with password validation
  const handleSaveChanges = () => {
    // If new password field is filled, validate all password fields
    if (passwordData.newPassword) {
      const isValid = validatePasswords();
      if (!isValid) return;
      
      // If validation passes, add only the new password to the profile changes
      // Backend only needs the new password to hash and store it
      saveProfileChanges({
        ...editedUser,
        password: passwordData.newPassword
      });
    } else {
      // No password changes, just save profile
      saveProfileChanges();
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  
  // Use firstName and lastName from userData
  const fullName = userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}`
    : userData?.firstName || userData?.lastName || 'User';
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h1>
        <p className="text-gray-600">Manage your account details and preferences</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-40 bg-gradient-to-r from-red-600 to-red-800">
          <div className="absolute -bottom-12 left-6 flex items-end">
            <div className="h-24 w-24 rounded-full ring-4 ring-white bg-white flex items-center justify-center overflow-hidden">
              {userData?.profileImage ? (
                <img src={userData.profileImage} alt={fullName} className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            {isEditingProfile && (
              <button className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full">
                <Camera className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {!isEditingProfile && (
            <button 
              onClick={() => setIsEditingProfile(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition duration-150"
            >
              <Edit className="h-4 w-4 mr-1.5" /> Edit Profile
            </button>
          )}
        </div>
        
        {/* Profile Content */}
        <div className="pt-16 px-6 pb-8">
          {isEditingProfile ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={editedUser.firstName || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={editedUser.lastName || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedUser.email || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={editedUser.phone || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={editedUser.location || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={3}
                  value={editedUser.bio || ''}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              {/* Password Change Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                  <Lock className="h-5 w-5 mr-2 text-gray-500" /> Change Password
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Password */}
                  <div className="relative">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={`block w-full pr-10 border ${
                          passwordErrors.currentPassword 
                            ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        } rounded-md shadow-sm py-2 px-3`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                    )}
                  </div>
                  
                  {/* New Password */}
                  <div className="relative">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`block w-full pr-10 border ${
                          passwordErrors.newPassword 
                            ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        } rounded-md shadow-sm py-2 px-3`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
                    )}
                  </div>
                  
                  {/* Confirm Password */}
                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`block w-full pr-10 border ${
                          passwordErrors.confirmPassword 
                            ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        } rounded-md shadow-sm py-2 px-3`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="h-4 w-4 mr-1.5" /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Check className="h-4 w-4 mr-1.5" /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
                {userData?.bio && <p className="mt-2 text-gray-600">{userData.bio}</p>}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <dl className="divide-y divide-gray-200">
                  {userData?.email && (
                    <div className="py-3 flex items-center">
                      <dt className="text-sm font-medium text-gray-500 flex items-center w-1/4">
                        <Mail className="h-5 w-5 mr-2 text-gray-400" /> Email
                      </dt>
                      <dd className="text-sm text-gray-900 mt-0 w-3/4">{userData.email}</dd>
                    </div>
                  )}
                  
                  {userData?.phone && (
                    <div className="py-3 flex items-center">
                      <dt className="text-sm font-medium text-gray-500 flex items-center w-1/4">
                        <Phone className="h-5 w-5 mr-2 text-gray-400" /> Phone
                      </dt>
                      <dd className="text-sm text-gray-900 mt-0 w-3/4">{userData.phone}</dd>
                    </div>
                  )}
                  
                  {userData?.location && (
                    <div className="py-3 flex items-center">
                      <dt className="text-sm font-medium text-gray-500 flex items-center w-1/4">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" /> Location
                      </dt>
                      <dd className="text-sm text-gray-900 mt-0 w-3/4">{userData.location}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}