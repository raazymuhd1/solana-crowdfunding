import React from 'react'
import { AppProviders } from '@/components/app-providers'

const CampaignLayout = ({ children }: { children: React.ReactNode } ) => {
  return (
      <AppProviders>
          <main> { children } </main>
      </AppProviders>
  )
}

export default CampaignLayout