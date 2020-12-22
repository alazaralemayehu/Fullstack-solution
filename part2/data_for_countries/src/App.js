import React , {useState, useEffect} from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_WEATHER_API;

const FilterCountries = ({value, onChange}) => {
  return (<p>Find Countries <input value={value} onChange={onChange}/></p>)
}

const Country = ({country, onClick}) => {

 return ( 
  <li  key={country.name} >{country.name}
    <button onClick={()=> onClick(country.name)}>show</button>
  </li>
  )
}

const WeatherIcon = ({imageURL}) => {
  return (
    <img src={imageURL} width="50px" height ="50px"/>
  )
}

const WeatherData = ({country}) => {
  const [weatherData, setWeatherData ] = useState({})
  const [weatherIcons, setWeatherIcons] = useState([])
  const [windSpeed, setWindSpeed] = useState(0)
  const [windDirection, setWindDirection] = useState("")
  const [temperature, setTemperature] = useState("")

  const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`
  console.log(WEATHER_URL)
  useEffect(() => {
    axios.get(WEATHER_URL)
    .then(response => {
      const weatherData = response.data
      setWeatherData(weatherData)
      setWeatherIcons(weatherData.current.weather_icons)
      setWindSpeed(weatherData.current.wind_speed)
      setWindDirection(weatherData.current.wind_dir)
      setTemperature(weatherData.current.temperature)
    })
  }, [])

  console.log(weatherIcons)
  return(<div>
    <h1> Weather in {country.capital}</h1>
    <p><b>Temperature</b> {temperature} Celcius</p>
  
    {weatherIcons.map(icon => <WeatherIcon key={icon} imageURL={icon}/>)}
    <p><b>Wind</b> {windSpeed} mph direction {windDirection}</p>
  </div>)
}
const CountryDetail = ({country}) => {
  return (
      <>
      <h1>
        {country.name}
      </h1>
      <p>Capital: {country.capital} </p>
      <p>Population : {country.population}</p>
      <h1> Languages</h1>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name} </li>
          )
        }
      </ul>
      <img src={country.flag} alt={country.name} width="20px" height="20px"/>
      </>
    )
}

const CountryLists = ({countries, onClick}) => {
  return (
    
    <ul>
    {countries.map(country=>
      <p key={country.name}>
        <Country country = {country} onClick={onClick}/>
      </p>
    )}
    </ul>
  )
}


const  App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')


const URL_FOR_COUNTRIES = 'https://restcountries.eu/rest/v2/all'

useEffect(() => {
  axios.get(URL_FOR_COUNTRIES)
  .then(response => {
    setCountries(response.data)
  })
}, [])
  
  
const onShowButtonClick = (country) => {
  setSearchCountry(country)

}

const handleSearchCountryChange = (event) => {
  const searchCountryName= event.target.value
  setSearchCountry(searchCountryName)
}

const countriesToShow = searchCountry?countries.filter(country => 
  country.name.toLowerCase()
  .includes(searchCountry.toLowerCase())):countries


const filteredCountryLength = countriesToShow.length
console.log(filteredCountryLength)


if (filteredCountryLength < 10 && filteredCountryLength >1) {
  return (
    <div>
      <FilterCountries value = {searchCountry} onChange= {handleSearchCountryChange}/>
      <CountryLists countries={countriesToShow} onClick={onShowButtonClick} />
    </div>
  )
} else if (filteredCountryLength === 1) {
  return(<div>
    <FilterCountries value = {searchCountry} onChange= {handleSearchCountryChange}/>
    <CountryDetail country = {countriesToShow[0]} />
    <WeatherData country={countriesToShow[0]}/>

  </div>)
} else {
  return (
    <div>
        <FilterCountries value = {searchCountry} onChange= {handleSearchCountryChange}/>
        <p>Too many match specify another filter</p>
    </div>
    )
}
}

export default App;
