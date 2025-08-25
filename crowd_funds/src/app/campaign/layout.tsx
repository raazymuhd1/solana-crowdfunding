import React from 'react'
import { AppProviders } from '@/components/app-providers'

const CampaignLayout = ({ children }: { children: React.ReactNode } ) => {
  return (
     <html lang='en' >
        <body>
          <AppProviders>
              {children}
          </AppProviders>
        </body>
     </html>
  )
}

export default CampaignLayout