import PrivateRoute from '@/components/privateRoutes/PrivateRoutes'
import React from 'react'
import SideBarStructure from '../sidebar/Sidebar'
import ProfilePage from '@/pages/profile/page'

export default function ProfileCustom({children,id}:any) {
  return (
    <>
    <PrivateRoute>
        <SideBarStructure title={`Profile by ${id}`}  id = {id} >
          <ProfilePage id={id} >
            {children}
          </ProfilePage>
        </SideBarStructure>
      </PrivateRoute>
    </>
  )
}
