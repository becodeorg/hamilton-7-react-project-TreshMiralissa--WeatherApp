
import { useState, useRef } from "react"


function App() {

const ref = useRef(null)
const apiKey = "fbbdfa582896093b8da1f248bec231ee"
const [weatherData, setWeatherData] = useState({})
const [city, setCity] = useState({})
const [nextDays, setNextDays] = useState({})

const handleClick = (e) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`) /*weather of the day*/
  .then (response => response.json())
  .then (data => {setWeatherData(data), setCity("")})
  ref.current.value = '';

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`) /*weather forecast of the five next days*/
  .then (response => response.json())
  .then (data => {setNextDays(data)})
};




const getWeather = (e) =>{
  if(e.key == "Enter"){
    handleClick()
  }
}

  return(
    <div className="container m-5">
      <h2 className="my-5">What is the weather like in ... ?</h2>
      <div className="flex flex-wrap justify-center bg-purple-100">
        <input className="input my-5" ref={ref} onChange={e => setCity (e.target.value)} onKeyPress={getWeather} placeholder="Search a city" />
        <button className=" p-2 bg-pink-300" onClick={handleClick}>Search</button>
      </div>
      {typeof weatherData.main === "undefined"?(
        <div>
          <p>Please enter a city</p>
        </div>):
              ( <div>
          <div>
            <p>Today</p>
            <p>{weatherData.name}</p> {/*display name of city*/}
            <p>{Math.round (weatherData.main.temp)}°C</p> {/*display temperature*/}
            <p>{weatherData.weather[0].main}</p> {/*display weather */}
            <p>{Math.round (weatherData.main.humidity)}%</p> 
          </div>
          {/* <div>
            <p>Next days</p>
            <p>{nextDays}</p>
            <p>{Math.round (weatherData.main.temp)}°C</p> 
            <p>{weatherData.weather[0].main}</p>
            <p>{Math.round (weatherData.main.humidity)}%</p> 
          </div> */}
        </div>
      )}
     
    </div>
  )
}

export default App
