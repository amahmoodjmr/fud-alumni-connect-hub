
import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface ProfileHeaderProps {
  isNewUser: boolean;
  paymentStatus?: string;
  userName?: string;
}

const ProfileHeader = ({ isNewUser, paymentStatus, userName }: ProfileHeaderProps) => {
  const isPaid = paymentStatus === 'paid';
  
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {userName ? `Welcome, ${userName}` : 'Profile Management'}
        </h1>
      </div>
      
      {isNewUser && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm text-yellow-700">Please complete your profile before proceeding</span>
        </div>
      )}
      
      {!isNewUser && (
        <div className={`${isPaid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'} border p-3 rounded-md flex items-center`}>
          {isPaid ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <span className="text-sm font-medium text-green-700">Verified Alumni</span>
                <p className="text-xs text-green-600">Your membership is active and payment is complete</p>
              </div>
            </>
          ) : (
            <>
              <ShieldAlert className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <span className="text-sm font-medium text-amber-700">Pending Verification</span>
                <p className="text-xs text-amber-600">Complete payment to activate full alumni benefits</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
