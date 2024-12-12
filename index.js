const API_KEY = ''

async function handleSearchCity() {
  document.querySelector('#cardWeather').classList.add('cardWeatherIsHidden')

  const getInputSearchCity = document.querySelector('#searchCity').value

  const getCardWeather = document.querySelector('#cardWeather')
  const getCityTemperature = document.querySelector('#dataCityTemperature')
  const getWeatherConditionalImg = document.querySelector('#weatherConditionalImg')
  const getPressure = document.querySelector('#dataPressure')
  const getHumidity = document.querySelector('#dataHumidity')

  // Prevents the request from being carried out if nothing is inserted into the input
  if(getInputSearchCity == '') {
    alert('Insira o nome de alguma cidade')
    
    return
  }

  // Request
  const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getInputSearchCity}&appid=${API_KEY}&units=metric`)
  const { name, main, weather } = await req.json()

  // If the city in which the user entered is not found
  if(name === undefined) {
    alert('Cidade não encontrada')

    return
  }

  getCityTemperature.innerHTML = `${name}, ${main.temp}°C`
  getWeatherConditionalImg.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  getPressure.innerHTML = `${main.pressure}hpa`
  getHumidity.innerHTML = `${main.humidity}%`

  getCardWeather.classList.remove('cardWeatherIsHidden')
}

addEventListener('keydown', (e) => {
  if(e.key == 'Enter') handleSearchCity()
})