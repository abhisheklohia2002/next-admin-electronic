import PrivateRoute from '@/components/privateRoutes/PrivateRoutes'
import ProfilePage from '@/pages/profile/page'
import SideBarStructure from '@/shared/sidebar/Sidebar'
import React from 'react'

export default function Profile() {
  return (
    <>
       <PrivateRoute>
            <SideBarStructure title="Profile Manages">
              <ProfilePage/>
            </SideBarStructure>
          </PrivateRoute>
    </>
  )
}
