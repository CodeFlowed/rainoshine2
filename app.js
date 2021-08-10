let weatherData;

const getWeather = () => {
    fetch('')
        .then(response => {
            if (!response.ok) {
                console.log('Unsuccessful');
            }
            return response.json();
        })
        .then(data => {
            drawWeather(data);
        })
        .catch(error => console.log('Sir, a Fetch error: ' + error.message));
}

const drawWeather = (weatherData) => {
    // Get HTML elements to update
    let elTitleNow  = document.getElementById('day-now'),
        elTempNow   = document.getElementById('temp__now'),
        elHighToday = document.getElementById('temp__today-high'),
        elLowToday  = document.getElementById('temp__today-low'),
        elTitleTomorrow  = document.getElementById('day-tomorrow'),
        elHighTomorrow   = document.getElementById('temp__tomorrow-high'),
        elLowTomorrow    = document.getElementById('temp__tomorrow-low');
        
    // Get specific weather data 
    let currentDateUnix = weatherData.current.dt,
        currentMonthAndDay = getMonthAndDay(currentDateUnix),
        currentDesc = weatherData.current.weather[0].description,
        currentTemp = Math.round(weatherData.current.temp),
        todaysHigh  = Math.round(weatherData.daily[0].temp.day),  
        todaysLow   = Math.round(weatherData.daily[0].temp.night),
        tomorrowsDateUnix    = weatherData.daily[1].dt,
        tomorrowsMonthAndDay = getMonthAndDay(tomorrowsDateUnix),
        tomorrowsDesc  = weatherData.daily[1].weather[0].description,
        tomorrowsHigh  = Math.round(weatherData.daily[1].temp.day),
        tomorrowsLow   = Math.round(weatherData.daily[1].temp.night);

    // Draw weather data into HTML elements
    elTitleNow.innerHTML += ` (${currentMonthAndDay})—${currentDesc}`;
    elTempNow.innerHTML = currentTemp + '°';
    elHighToday.innerHTML = todaysHigh;
    elLowToday.innerHTML = todaysLow;
    elTitleTomorrow.innerHTML += ` (${tomorrowsMonthAndDay})—${tomorrowsDesc}`;
    elHighTomorrow.innerHTML = tomorrowsHigh;
    elLowTomorrow.innerHTML = tomorrowsLow;
}

const getMonthAndDay = (unixTimestamp) => {
    let milliseconds = unixTimestamp * 1000,
        dateObject = new Date(milliseconds),
        monthAndDay = dateObject.toLocaleString("en-US", {month: "short", day: "numeric"});
    return `${monthAndDay}`;
}

window.onload = () => getWeather();