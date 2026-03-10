import { AnalyticsSection } from '@/app/components/AnalyticSummary'
import React from 'react'

const page = () => {
  return (
    <div className="min-w-full text-black">
    <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
            </div>
    <AnalyticsSection />
    </div>
  )
}

export default page