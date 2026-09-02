import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import './index.css'
const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [weather, setWeather] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    if (selected === true) {
      weatherService
        .getWeather(countriesToShow[0].capital[0], countriesToShow[0].cca2, api_key)
        .then(returnedWeather => {
          const weatherInfo = {
            temperature : ((returnedWeather.main.temp) - 273.15).toFixed(2),
            wind : (returnedWeather.wind.speed).toFixed(1),
            icon : `https://openweathermap.org/payload/api/media/file/${returnedWeather.weather[0].icon}.png`
          }
          setWeather(weatherInfo)
          }
        )
    }
    else {
      setWeather(null)
    }
  }, [selected])

  const handleSearchChange = (event) => {
    if (event.target.value === '') {
      setSearchTerm(event.target.value)
      setShowAll(true)
      setSelected(false)
    }
    else {
      setSearchTerm(event.target.value)
      setShowAll(false)
      const shown = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      if (shown.length === 1) {
        setSelected(true)
      }
      else {
        setSelected(false)
        setWeather(null)
      }
    }
  }  

  const handleSelectClick = ( country ) => {
    setSearchTerm(country.name.common)
    setSelected(true)
  }

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  if (weather) {
    return (
      <div>
        <Search searchTerm={searchTerm}
        onChange={handleSearchChange} />
        <Countries countries={countriesToShow} handleSelectClick={handleSelectClick}/>
        <Weather weather={weather} country={countriesToShow[0]}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <Search searchTerm={searchTerm}
        onChange={handleSearchChange} />
        <Countries countries={countriesToShow} handleSelectClick={handleSelectClick}/>
      </div>
    )
  }
}
const Search = ({searchTerm, onChange}) => (
  <p>
    find countries <input value= {searchTerm}
    onChange= {onChange}/>
  </p>
)
const Countryname = ({ country, handleSelectClick }) => (
  <p>
    {country.name.common}<button onClick={() => handleSelectClick(country)}>Show</button>
  </p>
)
const Weather = ({ weather, country }) => {
  return(
    <div>
      <h2>
        Weather in {country.name.common}
      </h2>
      <p>
        Temperature: {weather.temperature} Celsius
      </p>
      <img src={weather.icon}></img>
      <p>
        Wind: {weather.wind} m/s
      </p>
    </div>
  )
}
const CountryPage = ({ country }) => {
  return(
    <div>
      <h2>
        {country.name.common}
      </h2>
      <p>
        Capital: {country.capital}
      </p>
      <p>
        Area: {country.area}
      </p>
      <h3>
        Languages
      </h3>
      <ul>
        {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  )
}
const Countries = ({ countries, handleSelectClick }) => {
  if (countries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (countries.length === 0) {
    return(
      <div>
        No matches, give another filter
      </div>
    )
  }
  if (countries.length === 1) {
    return(
      <>
        {countries.map((country, i) =>
        <CountryPage key={i} country={country}/>)}
      </>
    )
  }
  {
    return(
      <div>
        {countries.map((country, i) =>
        <Countryname key={i} country={country} handleSelectClick={handleSelectClick}/>)}
      </div>
    )
  }
}
export default App