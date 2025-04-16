
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProfileHeaderProps {
  isNewUser: boolean;
}

const ProfileHeader = ({ isNewUser }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Profile Management</h1>
      
      {isNewUser && (
        <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm text-yellow-700">Please complete your profile before proceeding</span>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
