import PrivateRoute from '@/components/privateRoutes/PrivateRoutes'
import ScoringPage from '@/pages/scoring/Scoring'
import SideBarStructure from '@/shared/sidebar/Sidebar'
import React from 'react'

export default function ScroingManage() {
  return (
    <>
         <PrivateRoute>
           <SideBarStructure title="Manage Scoring">
             <ScoringPage/>
           </SideBarStructure>
         </PrivateRoute>
       </>
  )
}
