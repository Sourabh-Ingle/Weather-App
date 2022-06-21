import React, { useState,useEffect } from 'react'
import './App.css';





const App = () => {

  // ==============  useSTATE  HOOK =========
  const [search, setSearch] = useState('Nagpur');
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');

  // ============ CONSTANT AND DATE RELATED LOGIC
  const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  let d = new Date();

  setInterval(() => {
    setTime(d.getSeconds());
  }, 1000);

  let date = d.getDate();
  let mins = d.getMinutes();
  let hrs = d.getHours();
  let monthdate = monthName[d.getMonth()];
  let weekday = weekdays[d.getDay()];
  let day_night = "AM";

  if (mins < 10) {
    mins = "0" + mins;
  }

  if (hrs > 11) {
    day_night = "PM"
  }

  if (hrs > 12) {
    hrs = hrs - 12;
  }

  // =================== FETCH APL AND useEFFECT HOOK ==============
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}




  useEffect(() => {
    const fetchApi = async () => {


      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e1e796240299eca0ea39edab6ff0b6f2`;

      const response = await fetch(url);
      const mydata = await response.json();
      setCity(mydata.main);
    };

    fetchApi();
  }, [search])

  return (
    <div className='container-center'>
      <div className="weatherapp-theme App">
        <div className="center_div weatherapp-bg-theme">
          <h1 className='heading_weather'>Today's Weather</h1>
          <input
            type="search"
            className='inputField'
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />



          <div className="info">
            {
              !city ? (<p> Data not Found</p>)
                : (
                  <div>

                    <h1 className="location">{search.toUpperCase()}</h1>
                    <p className="date-time">{weekday} | {monthdate}  {date} | {hrs}:{mins} {day_night}</p>
                    <h1 className="temp">{city.temp}°C</h1>
                    <h5 className="temp_min_max">max : {city.temp_max}°Cel | min : {city.temp_min}°Cel</h5>

                  </div>)


            }


          </div>



        </div>
      </div>





    </div>
  )
}



export default App;
