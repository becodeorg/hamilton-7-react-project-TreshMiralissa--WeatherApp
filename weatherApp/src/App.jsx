
import { useState, useRef } from "react"
import { emojis } from "./utils/emojis"
import Moment from "moment"


function App() {

const ref = useRef(null)
const apiKey = "fbbdfa582896093b8da1f248bec231ee"
const unsplachKey = "laoDs_YhFMrMv-5iCD_iFUwJCsM38z2DJJph5-FPeNM"
const [cityImage, setCityImage]= useState({})
const [weatherData, setWeatherData] = useState({})
const [city, setCity] = useState({})
const [nextDays, setNextDays] = useState({})
const [forecastArray, setForecastArray] = useState ([])



const handleClick = (e) => {
  let randomNumber = Math.floor(Math.random() * 10);
  fetch(`https://unsplash.com/search/photo?query=${city}?client_id=${unsplachKey}`) /*display image*/
  .then (response => response.json())
  .then (data => { let allImages = data.results[randomNumber];
    return allImages.urls.regular})


  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`) /*weather of the day*/
  .then (response => response.json())
  .then (data => {setWeatherData(data), setCity("")})
  ref.current.value = '';

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`) /*weather forecast of the five next days*/
  .then (response => response.json())
  .then (data => {setNextDays(data), setForecastArray([data.list[7],data.list[15],data.list[23],data.list[31],data.list[39]])})
  
};

const getWeather = (e) =>{
  if(e.key == "Enter"){
    handleClick()
  }
}

  return(
    <div  className="container ">
      <h2 className="mt-10 mb-5">What is the weather like in ... ?</h2>
      <div className="flex flex-wrap w-fit p-2 rounded bg-gradient-to-r from-pink-500 to-yellow-500">
        <input className="input pl-2" ref={ref} onChange={e => setCity (e.target.value)} onKeyPress={getWeather} placeholder="Search a city" />
        <button className=" p-2" onClick={handleClick}>Search</button>
      </div>
    <div>
      {typeof weatherData.main === 'undefined'?(
        <p className="mt-2">Please enter a city</p>
      ):
      (<div className= "bg-gradient-to-r from-pink-500 to-yellow-500 mt-10 rounded-lg shadow-lg px-4 py-4 xl:py-12 xl:px-28 md:px-12 md:py-8">
        <div className="flex flex-col justify-center items-center xl:ml-auto mx-auto">
          <img src="" alt="" />
          <p className="mb-5 mt-12 text-xl xl:pl-4">Today in {weatherData.name}</p> 
            {/*display name of city*/}
          <div className="m-6 p-3 flex flex-col justify-center items-center">
            <p>{Math.round (weatherData.main.temp)}°C</p>
            {/*display temperature*/}
            <p>{weatherData.weather[0].main}</p>
            {/*display weather */}
            <p>Humidity : {Math.round (weatherData.main.humidity)}%</p> 
            <p>{emojis.wind} Wind: {weatherData.wind.speed}km/h</p>
          </div>
        </div>
        <div className="my-10">
          <p  className="text-lg font-bold">Next days</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">
            {forecastArray?.map((day)=>
              <div className="text-center p-6 rounded-md bg-white/30 shadow-md flex justify-center items-center flex-col">
                <p>{emojis.calendar}{Moment(day.dt_txt).format('MM-DD-YYYY')}</p>
                <p>{Math.round (day.main.temp)}°C</p> 
                <p>{day.weather[0].main}</p>
              </div>)}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>)
}

export default App
