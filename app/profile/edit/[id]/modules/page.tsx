import ProfileModule from '@/components/profile-module/ProfileModule';
import ProfileCustom from '@/shared/profile-custom/Profile-custom';
import React from 'react'

export default async function page({ params }: any) {
  const { id } = await params;

  return (
     <>
      <ProfileCustom id = {id}>
        <ProfileModule userId = {id}/>
      </ProfileCustom>
      </>
  )
}
