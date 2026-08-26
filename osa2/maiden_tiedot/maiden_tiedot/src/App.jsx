import { useState, useEffect } from 'react'
import countryService from './services/countries'
import './index.css'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
        if (event.target.value === '') {
      setSearchTerm(event.target.value)
      setShowAll(true)
    }
    else {
      setSearchTerm(event.target.value)
      setShowAll(false)
    }
  }  

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Search searchTerm={searchTerm}
      onChange={handleSearchChange} />
      <Countries countries={countriesToShow}/>
    </div>
  )
}
const Search = ({searchTerm, onChange}) => (
  <p>
    find countries <input value= {searchTerm}
    onChange= {onChange}/>
  </p>
)
const Countryname = ({ countryname }) => (
  <p>
    {countryname.common}
  </p>
)

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
const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (countries.length < 2) {
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
        <Countryname key={i} countryname={country.name}/>)}
      </div>
    )
  }
}
export default App