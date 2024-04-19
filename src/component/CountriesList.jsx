import React, { useState,useEffect } from 'react'
import CountryCard from './CountryCard'
import CountrySimmer from './CountrySimmer'
//import data from '../countriesData'

const CountriesList = ({query}) => {

  let [rowData ,setRowData] = useState([])

  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all')
    .then((res)=> res.json())
     .then((data)=>{
       setRowData(data)
     })

    //  const intervalId = setInterval(() => {
    //   console.log('running countriesList component');
    //   }, [1000])

    //   console.log(intervalId);

    //   return () => {
    //     clearInterval(intervalId)
    //     console.log("it will will when component will unmount. Its cleanup method. And it is used to clear setTimeout and setTimeInterval")
    //   }
  },[])


  if(rowData.length === 0){
    return <CountrySimmer />
  }

  return (

    <div className="countries-container">
        {
          rowData.filter((country)=>
            country.name.common.toLocaleLowerCase().includes(query)
          ).map((country)=>{
            return (
                <CountryCard key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
                />
            )
          })
        }
    </div> 
  )
}

export default CountriesList
