var res = fetch("https://restcountries.com/v2/all");
res.then((data)=> data.json()).then(function(data1){
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    document.body.append(container);

    var rowDiv; // Variable to hold the current row

    for(let i = 0; i < data1.length; i++){
        if (i % 5 === 0) {
            // Create a new row for every 5 columns
            rowDiv = document.createElement("div");
            rowDiv.setAttribute("class", "row");
            container.append(rowDiv);
        }

        var div = document.createElement("div");
        div.setAttribute("class", "col");
        div.innerHTML = 
            `
            <div class="card" style="width: 18rem;">
            <h5 class="card-header">${data1[i].name}</h5>
            <img src="${data1[i].flag}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text">${"Capital: "+data1[i].capital}</p>
            <p class="card-text">${"Region: "+data1[i].region}</p>
            <p class="card-text">${"Country Code: "+data1[i].cioc}</p>
            <button class="weather-button" data-country="${data1[i].name}">Check Weather</button>
            <div class="weather-info" style="display: none;"></div>
            </div>
            </div>`
        rowDiv.append(div);
    }

    const weatherButtons = document.querySelectorAll(".weather-button");
    weatherButtons.forEach(button => {
        button.addEventListener("click", function () {
            const countryName = this.getAttribute("data-country");
            fetchWeather(countryName, this.nextElementSibling.querySelector('.weather-info'));
        });
    });

    function fetchWeather(countryName, weatherInfoContainer) {
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = `
                    <p>Weather in ${countryName}:</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                weatherInfoContainer.innerHTML = weatherInfo;
                weatherInfoContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
});
