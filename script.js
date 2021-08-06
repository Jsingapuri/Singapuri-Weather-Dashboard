
$( document ).ready(function() {
var apiKey = "4bc298a4a24dcad511d44a374673be0f";
//function to retrieve data from api
var getCurrentWeather = function(cityName) {
	$.ajax(
	  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
	).done(function (response) {
	  console.log(response);
      //creates a template onto the DOM that contains the current weather temp           
	  var template = `
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">${response.name} (${new Date().toLocaleDateString()})
					<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"/>
				</h5>
				<p class="card-text">Temp: ${response.main.temp} F</p>
				<p class="card-text">Humidity: ${response.main.humidity}%</p>
				<p class="card-text">Wind Speed: ${response.wind.speed}</p>
				<p class="card-text description">Feels like: ${response.main.feels_like}</p>
			</div>
		</div>
	  `;
	  		var currentFeel = response.main.feels_like;
    
			var allDescriptions = document.querySelectorAll(".description");

		function theFeels(description) {

    		if (currentFeel > 60) {
        		$(description).addClass("noGood");
    		} else if (currentFeel < 60) {
       		 $(description).addClass("isGood");
    		} 
};
	console.log(currentFeel);
	  document.querySelector(".currentWeather").innerHTML = template;
	});
}

var getForecast = function(cityName) {
fetch(
	`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`,
  )
	.then((response) => response.json())
	.then((result) => {
	  console.log(result);
  
	  //genres[1].name
	  var allWeather = result.list.filter(function(item) {
		return item.dt_txt.includes("12:00:00");
	  });

	  console.log(allWeather);
	// creates a template onto the DOM to contain the 5 day weather forecast
	  var template = "";
	  allWeather.forEach(function (weather) {
		template += `
				<div class="card main">
					<div class="card-body">
						<h5 class="card-title">${weather.dt_txt})
							<img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png"/>
						</h5>
						<p class="card-text">Temp: ${weather.main.temp} F</p>
						<p class="card-text">Humidity: ${weather.main.humidity}%</p>
						<p class="card-text">Wind Speed: ${weather.wind.speed}</p>
					</div>
				</div>
			  `;
	  });
  
	  document.querySelector(".forecast").innerHTML = template;
	})
	.catch((error) => console.log("error", error));
}

var searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  
//calls the getCurrentWeather
  getCurrentWeather(searchInputVal);

//calls the getForecast function
  getForecast(searchInputVal);


}
// creates the event listner to the form button
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
});
