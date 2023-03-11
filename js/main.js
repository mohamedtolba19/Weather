let todayDay = document.getElementById("today-day");
let todaymMonth = document.getElementById("today-month");
let city =  document.getElementById("city");
let todayTemC = document.getElementById("today-c");
let todayTempIcon = document.getElementById("today-temp-icon");
let tempCondition = document.getElementById("temp-condition");
let humidity  =document.getElementById("humidity");
let wind_kph = document.getElementById("wind_kph");
let  wind_dir = document.getElementById(" wind_dir");
let nextDay = document.querySelectorAll(".next-day");
todayTempIcons = document.querySelectorAll('.today-temp-icon');
let maxTemp = document.querySelectorAll(".max");
let minTemp = document.querySelectorAll(".min");
let tempConditions = document.querySelectorAll(".temp-condition");
let searchInput = document.getElementById("searchInput");


let days = ["Sunday" , "Monday" , "Tuesday" ,"Wednesday" ,"Thursday", "Friday" ,"saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let response ;
let responseData ;

async function getWeather(currntCity = "cairo")
{
  response =  await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=5bc2e99db5ca4e0280994852231003&q=${currntCity}&days=3`);
  responseData = await response.json();
  console.log(responseData);
  dispalyTodayWeather();
  dispalyNextDayWeather()
}
getWeather();
searchInput.addEventListener("keyup" , function()
{
   
        getWeather(searchInput.value);  
    
   
   
}

)

function dispalyTodayWeather()
{
    let date = new Date();
    todayDay.innerHTML = days[date.getDay()];
    todaymMonth.innerHTML = date.getDate()+ months[date.getMonth()];
     city.innerHTML= responseData.location.name ;
     todayTemC.innerHTML =`${responseData.current.temp_c}<sup>o</sup>C` ;
     todayTempIcon.setAttribute("src" , `https:${responseData.current.condition.icon}`);
     tempCondition.innerHTML = responseData.current.condition.text;
     humidity.innerHTML = `<i class="fa-solid fa-umbrella"></i> ${responseData.current.humidity}%`;
     wind_kph.innerHTML = ` <i class="fa-solid fa-wind"></i>
      ${responseData.current.wind_kph}km/h` ;
     wind_dir.innerHTML = `<i class="fa-regular fa-compass"></i> ${responseData.current.wind_dir}` ;
     


    
}

function dispalyNextDayWeather()
{
 
   
    for(let i = 0 ;i<nextDay.length ; i++)
    {
       nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
       todayTempIcons[i].setAttribute("src" , responseData.forecast.forecastday[i+1].day.condition.icon)
       maxTemp[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.maxtemp_c}<sup>o</sup>C`;
       minTemp[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup>C`;
tempConditions[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text ;
    
    }

}

$(document).ready(function()
{
 $('.sk-folding-cube').fadeOut(3000 , function()
 {
  $('#loading').fadeOut(500 , function()
  {
    $('#loading').remove();
  });
  })
})
