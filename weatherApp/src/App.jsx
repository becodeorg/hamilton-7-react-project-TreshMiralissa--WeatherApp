
import { useState } from "react"


function App() {

const apiKey = "fbbdfa582896093b8da1f248bec231ee"
const [weatherData, setWeatherData] = useState({})
const [city, setCity] = useState({})

const getWeather = (e) =>{
  if(e.key == "Enter"){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then (response => response.json())
    .then (data => {setWeatherData(data), setCity("")})
  }
}

  return(
    <div className="container">
      <h2 className="m-10">What is the weather like in ... ?</h2>
      <input className="input" onChange={e => setCity (e.target.value)} onKeyPress={getWeather} placeholder="Search a city" />
      {typeof weatherData.main === "undefined"?(
        <div>
          <p>Please enter a city</p>
        </div>):
      (<div>
        <p>{weatherData.name}</p> {/*display name of city*/}
        <p>{Math.round (weatherData.main.temp)}°C</p> {/*display temperature*/}
        <p>{weatherData.weather[0].main}</p> {/*display weather */}
        <p>{Math.round (weatherData.main.humidity)}%</p> 
      </div>
      )}
    </div>
  )
}

export default App
