const api={
    key:"77494d1f9443a6eb4c4f8ffdd8d96a6e",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',function(evt){
    if(evt.keyCode == 13){
        searchbox.blur();
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
});

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    if(weather.cod!=404)
    {
        document.getElementById('err-msg').innerHTML = "";

        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name},${weather.sys.country}`;
    
        let now=new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);
    
        let temp = document.querySelector('.current .temp');
        temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;
    
        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = `${weather.weather[0].main}`;
    
        let hilow = document.querySelector('.hi-low');
        hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    }
    else {
        document.getElementById('err-msg').innerHTML = "Sorry couldn't find the desired city";
        clearRegions();
    }
}

function clearRegions() {
    document.querySelector('.city').innerHTML = "";
    document.querySelector('.date').innerHTML = "";
    document.querySelector('.temp').innerHTML = "";
    document.querySelector('.weather').innerHTML = "";
    document.querySelector('.hi-low').innerHTML = "";
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }


