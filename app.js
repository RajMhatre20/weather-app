window.addEventListener("load", () => {
  let lon;
  let lat;
  let temperaturedescription = document.querySelector(
    ".temperature-description"
  );
  let temperaturedegree = document.querySelector(".temperature-degree");
  let location = document.querySelector(".location-timezone");
  const temperaturesection = document.querySelector(".temperature");
  const temperaturespan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((postion) => {
      lon = postion.coords.longitude;
      lat = postion.coords.latitude;
      function getIcon(icon) {
        switch (icon) {
          case "01d":
            return "CLEAR_DAY";
          case "01n":
            return "CLEAR_NIGHT";
          case "02d":
            return "PARTLY_CLOUDY_DAY";
          case "02n":
            return "PARTLY_CLOUDY_NIGHT";
          case "03d":
            return "CLOUDY";
          case "03n":
            return "CLOUDY";
          case "04d":
            return "CLOUDY";
          case "04n":
            return "CLOUDY";
          case "09d":
            return "RAIN";
          case "09n":
            return "RAIN";
          case "10d":
            return "RAIN";
          case "10n":
            return "RAIN";
          case "11d":
            return "WIND";
          case "11n":
            return "WIND";
          case "13d":
            return "SNOW";
          case "13n":
            return "SNOW";
          case "50d":
            return "FOG";
          case "50n":
            return "FOG";
        }
      }
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=11bdd9b8c3d8e7acd7ca3c63ee4533c9`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { icon, description } = data.weather[0];
          temperaturedegree.textContent = parseFloat(temp - 273.15).toFixed(1);
          temperaturedescription.textContent = description;
          location.textContent = data.name;

          //   Icon
          var skycons = new Skycons({ color: "white" });
          var currentIcon = getIcon(icon);
          skycons.add("icon1", Skycons[currentIcon]);
          skycons.play();

          // Temperature Conversion
          temperaturesection.addEventListener("click", () => {
            if (temperaturespan.textContent === "C") {
              console.log(1);
              temperaturespan.textContent = "F";
              temperaturedegree.textContent = parseFloat(
                ((temp - 273.15) * 9) / 5 + 32
              ).toFixed(1);
            } else {
              temperaturespan.textContent = "C";
              temperaturedegree.textContent = parseFloat(temp - 273.15).toFixed(
                1
              );
            }
          });
        });
    });
  }
});
