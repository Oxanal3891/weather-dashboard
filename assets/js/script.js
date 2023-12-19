//Declare letiables
let searchBtn = $("#search-button");
let clearBtn = $("#clear");
let input = $("#search-input");
let city = $("#city");
let temperature = $("#temperature");
let wind = $("#wind");
let humidity = $("#humidity");
let index = $("#index");
let citiesPrev = $(".input-group-append");


//function to create cards upon user input

function addEntry() {
    historyCities.sort();
    for (let i = 0; i < historyCities.length; i++) {
        if (historyCities[i] === historyCities[i - 1]) {
            historyCities.splice(i, 1);
            i--;
        }
    }
    createCard();
}

addEntry();

function createCard() {
    citiesPrev.children().remove();
    for (let i = 0; i < historyCities.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = (historyCities[i]);
        btn.setAttribute("id", "Relook");
        document.getElementById("input-group-append").appendChild(btn);
    }
}

//Fetch API on button click

$searchBtn.on("click", function (event) {
    console.log(input.value);

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=ec96c3d6509b8a012ba07a86b8f2719b")
        .then(response => response.json())
        .then(data => {

            let cityValue = data["name"];
            let temperatureValue = data["main"]["temp"];
            let windValue = data["wind"]["speed"];
            let humidityValue = data["main"]["humidity"];
            let imgValue = data.weather[0].icon;


            city.innerHTML = (cityValue + " ");
            let converttemperature = Math.trunc(1.8 * (temperatureValue - 273) + 32);
            temperature.innerHTML = ("temperature " + converttemperature + " °F");
            wind.innerHTML = ("wind: " + windValue + " mph");
            humidity.innerHTML = ("humidity: " + humidityValue);


            addicon.src = "http://openweathermap.org/img/wn/" + imgValue + ".png";

            document.getElementById("index").append(addicon);

            historyCities.push(cityValue);
            localStorage.setItem("saved", JSON.stringify(historyCities));
            addEntry();
        })

        .catch(err => alert("Wrong city name"))

    // fetch request to get 5-day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + input.value + "&units=imperial&appid=ec96c3d6509b8a012ba07a86b8f2719b")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let icon1 = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            $("#icon1").attr("src", icon1);
            document.getElementById("temperature1").innerHTML = "temperature: " + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById("wind1").innerHTML = "wind: " + Number(data.list[0].wind.speed) + " Mph";
            document.getElementById("humidity1").innerHTML = "humidity: " + Number(data.list[0].main.humidity);
            document.getElementById("date1").innerHTML = (data.list[0].dt_txt);

            let icon2 = "https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png";
            $("#icon2").attr("src", icon2);
            document.getElementById("temperature2").innerHTML = "temperature: " + Number(data.list[8].main.temp).toFixed(0) + "°F";
            document.getElementById("wind2").innerHTML = "wind: " + Number(data.list[8].wind.speed) + " Mph";
            document.getElementById("humidity2").innerHTML = "humidity: " + Number(data.list[8].main.humidity);
            document.getElementById("date2").innerHTML = (data.list[8].dt_txt);

            let icon3 = "https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png";
            $("#icon3").attr("src", icon3);
            document.getElementById("temperature3").innerHTML = "temperature: " + Number(data.list[16].main.temp).toFixed(0) + "°F";
            document.getElementById("wind3").innerHTML = "wind: " + Number(data.list[16].wind.speed) + " Mph";
            document.getElementById("humidity3").innerHTML = "humidity: " + Number(data.list[16].main.humidity);
            document.getElementById("date3").innerHTML = (data.list[16].dt_txt);

            let icon4 = "https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png";
            $("#icon4").attr("src", icon4);
            document.getElementById("temperature4").innerHTML = "temperature: " + Number(data.list[24].main.temp).toFixed(0) + "°F";
            document.getElementById("wind4").innerHTML = "wind: " + Number(data.list[24].wind.speed) + " Mph";
            document.getElementById("humidity4").innerHTML = "humidity: " + Number(data.list[24].main.humidity);
            document.getElementById("date4").innerHTML = (data.list[24].dt_txt);

            let icon5 = "https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png";
            $("#icon5").attr("src", icon5);
            document.getElementById("temperature5").innerHTML = "temperature: " + Number(data.list[32].main.temp).toFixed(0) + "°F";
            document.getElementById("wind5").innerHTML = "wind: " + Number(data.list[32].wind.speed) + " Mph";
            document.getElementById("humidity5").innerHTML = "humidity: " + Number(data.list[32].main.humidity);
            document.getElementById("date5").innerHTML = (data.list[32].dt_txt);
        })

})

$citiesPrev.on("click", "#Relook", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log("Clicked");
    let city = $(this).text();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ec96c3d6509b8a012ba07a86b8f2719b")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let cityValue = data["name"];
            let temperatureerValue = data["main"]["temp"];
            let windValue = data["wind"]["speed"];
            let humidityValue = data["main"]["humidity"];
            let ImgValue = data.weather[0].icon;


            city.innerHTML = (cityValue + " ");
            let converttemperature = Math.trunc(1.8 * (temperatureValue - 273) + 32);
            temperature.innerHTML = ("temperature: " + converttemperature + " °F");
            wind.innerHTML = ("wind: " + windValue + " mph");
            humidity.innerHTML = ("humidity: " + humidityValue);


            addicon.src = "http://openweathermap.org/img/wn/" + ImgValue + ".png";

            document.getElementById("index").append(addicon);

            historyCities.push(cityValue);
            localStorage.setItem("saved", JSON.stringify(historyCities));
            addEntry();
        })



        .catch(err => alert("Wrong city name"))

    // fetch request to get 5-day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ec96c3d6509b8a012ba07a86b8f2719b")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let icon1 = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            $("#icon1").attr("src", icon1);
            document.getElementById("temperature1").innerHTML = "temperature: " + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById("wind1").innerHTML = "wind: " + Number(data.list[0].wind.speed) + " Mph";
            document.getElementById("humidity1").innerHTML = "humidity: " + Number(data.list[0].main.humidity);
            document.getElementById("date1").innerHTML = (data.list[0].dt_txt);

            let icon2 = "https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png";
            $("#icon2").attr("src", icon2);
            document.getElementById("temperature2").innerHTML = "temperature: " + Number(data.list[8].main.temp).toFixed(0) + "°F";
            document.getElementById("wind2").innerHTML = "wind: " + Number(data.list[8].wind.speed) + " Mph";
            document.getElementById("humidity2").innerHTML = "humidity: " + Number(data.list[8].main.humidity);
            document.getElementById("date2").innerHTML = (data.list[8].dt_txt);

            let icon3 = "https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png";
            $("#icon3").attr("src", icon3);
            document.getElementById("temperature3").innerHTML = "temperature: " + Number(data.list[16].main.temp).toFixed(0) + "°F";
            document.getElementById("wind3").innerHTML = "wind: " + Number(data.list[16].wind.speed) + " Mph";
            document.getElementById("humidity3").innerHTML = "humidity: " + Number(data.list[16].main.humidity);
            document.getElementById("date3").innerHTML = (data.list[16].dt_txt);

            let icon4 = "https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png";
            $("#icon4").attr("src", icon4);
            document.getElementById("temperature4").innerHTML = "temperature: " + Number(data.list[24].main.temp).toFixed(0) + "°F";
            document.getElementById("wind4").innerHTML = "wind: " + Number(data.list[24].wind.speed) + " Mph";
            document.getElementById("humidity4").innerHTML = "humidity: " + Number(data.list[24].main.humidity);
            document.getElementById("date4").innerHTML = (data.list[24].dt_txt);

            let icon5 = "https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png";
            $("#icon5").attr("src", icon5);
            document.getElementById("temperature5").innerHTML = "temperature: " + Number(data.list[32].main.temp).toFixed(0) + "°F";
            document.getElementById("wind5").innerHTML = "wind: " + Number(data.list[32].wind.speed) + " Mph";
            document.getElementById("humidity5").innerHTML = "humidity: " + Number(data.list[32].main.humidity);
            document.getElementById("date5").innerHTML = (data.list[32].dt_txt);
        })

});

$clearBtn.on("click", function () {
    localStorage.clear();
    location.reload();
})
