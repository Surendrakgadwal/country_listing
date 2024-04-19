import React from 'react'
import { useEffect,useState } from 'react'
import './Country.css'
import { useParams,Link,useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'


const Country = () => {
    const [isDark] = useTheme()
    let param = useParams()
    let countryName = param.country
    const { state } = useLocation()
    //let countryName = window.location.href.split('?name=')[1]
    //console.log(href)

    // let href1 =  new URLSearchParams(location.search).get('name')
    // console.log(href1)
    let [CData, setCData] = useState(null)
    let [notFound, setNotFound] = useState(false)

    function updateCountryData(data) {
      setCData({
        name: data.name.common,
        nativeName: Object.values(data.name.nativeName)[0].common,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        flag: data.flags.svg,
        tld: data.tld,
        languages: Object.values(data.languages).join(', '),
        currencies: Object.values(data.currencies)
          .map((currency) => currency.name)
          .join(', '),
        borders: [],
      })
  
      if (!data.borders) {
        data.borders = []
      }
  
      Promise.all(
        data.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common)
        })
      ).then((borders) => {
        setTimeout(() => setCData((prevState) => ({ ...prevState, borders })))
      })
    }

    useEffect(() => {

      if (state) {
        updateCountryData(state)
        return
      }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((res)=>res.json())
        .then(([data])=>{
          updateCountryData(data)

        }).catch((err)=>{
          setNotFound(true)
        })
    })
    
    if(notFound){
      return <div>Country Not found</div>
    }
    return CData === null ? (
        'loading...'
      ) : (
        <main className={`${isDark? 'dark': ''}`}>
          <div className="country-details-container">
            <span className="back-button" onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
            </span>
            <div className="country-details">
              <img src={CData.flag} alt={`${CData.name} flag`} />
              <div className="details-text-container">
                <h1>{CData.name}</h1>
                <div className="details-text">
                  <p>
                    <b>Native Name: {CData.nativeName}</b>
                    <span className="native-name"></span>
                  </p>
                  <p>
                    <b>
                      Population: {CData.population.toLocaleString('en-IN')}
                    </b>
                    <span className="population"></span>
                  </p>
                  <p>
                    <b>Region: {CData.region}</b>
                    <span className="region"></span>
                  </p>
                  <p>
                    <b>Sub Region: {CData.subregion}</b>
                    <span className="sub-region"></span>
                  </p>
                  <p>
                    <b>Capital: {CData.capital.join(', ')}</b>
                    <span className="capital"></span>
                  </p>
                  <p>
                    <b>Top Level Domain: {CData.tld}</b>
                    <span className="top-level-domain"></span>
                  </p>
                  <p>
                    <b>Currencies: {CData.currencies}</b>
                    <span className="currencies"></span>
                  </p>
                  <p>
                    <b>Languages: {CData.languages}</b>
                    <span className="languages"></span>
                  </p>
                </div>
                { CData.borders.length !== 0 && <div className="border-countries">
                 <b>Border Countries: </b>&nbsp;
                {
                  CData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
                }
                </div>
              }
              </div>
            </div>
          </div>
        </main>
      )
    }

export default Country
