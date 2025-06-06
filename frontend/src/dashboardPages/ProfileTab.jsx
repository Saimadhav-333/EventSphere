import React from 'react';
import ProfileView from './ProfileView';
import ProfileEditForm from './ProfileEditForm';

export default function ProfileTab({ 
  userData, 
  isEditingProfile, 
  editedUser, 
  setIsEditingProfile, 
  handleProfileChange, 
  saveProfileChanges, 
  setEditedUser 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
      {isEditingProfile ? (
        <ProfileEditForm 
          user={editedUser} 
          onChange={handleProfileChange}
          onSave={saveProfileChanges}
          onCancel={() => {
            setEditedUser(userData);
            setIsEditingProfile(false);
          }}
        />
      ) : (
        <ProfileView 
          user={userData} 
          onEdit={() => setIsEditingProfile(true)} 
        />
      )}
    </div>
  );
}
