import React from 'react'
import './CountrySimmer.css' 

const CountrySimmer = () => {
  return (
    <div className="countries-container">
        {Array.from({ length: 30 }).map((el, i) => {
            return <div key={i} className="country-card shimmer-card"></div>
        })}
  </div>
  )
}

export default CountrySimmer
