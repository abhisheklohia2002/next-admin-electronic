import PrivateRoute from '@/components/privateRoutes/PrivateRoutes'
import Rolespage from '@/pages/roles/page'
import SideBarStructure from '@/shared/sidebar/Sidebar'
import React from 'react'

export default function Roles() {
  return (
 <>
      <PrivateRoute>
        <SideBarStructure title="Roles Manage">
          <Rolespage/>
        </SideBarStructure>
      </PrivateRoute>
    </>
  )
}
