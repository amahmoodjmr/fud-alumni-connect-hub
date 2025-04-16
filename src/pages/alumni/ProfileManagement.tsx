
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileImageUploader from '@/components/profile/ProfileImageUploader';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import { useProfile } from '@/hooks/use-profile';

const ProfileManagement = () => {
  const { 
    isLoading,
    imageUrl,
    isNewUser,
    userData,
    updateProfile,
    handleImageUploaded
  } = useProfile();

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <ProfileHeader isNewUser={isNewUser} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {userData && (
                  <ProfileImageUploader 
                    userId={userData.id}
                    imageUrl={imageUrl}
                    onImageUploaded={handleImageUploaded}
                    isRequired={isNewUser}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {userData && (
              <PersonalInfoForm 
                initialData={userData}
                onSubmit={updateProfile}
                isLoading={isLoading}
                isNewUser={isNewUser}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileManagement;
