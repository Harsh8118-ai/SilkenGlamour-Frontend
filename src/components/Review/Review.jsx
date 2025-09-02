import React from 'react'
import ReviewComponent from './ReviewComponent'
import ReviewStats from './ReviewStats'
import FilteredReviews from './FilteredReviews'

export default function Review() {
  return (
    <>
    <div className="bg-BGColorYellow p-6">
      

      <div className="flex flex-col md:flex-row">
        
        <div className="md:flex-[1] w-full"> 
          <ReviewComponent />
        </div>
      </div>


      {/* All Filtered Reviews */}
      <div className="mt-4">
        <FilteredReviews />
      </div>
    </div>
    </>
  )
}
