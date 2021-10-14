console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let location = document.getElementById('location').value
    let forecastParagraph = document.getElementById('forecast')
    forecastParagraph.innerHTML = 'Loading...'
    fetch('http://localhost:3000/weather?location=' + encodeURIComponent(location)).then((res) => {
    res.json().then((data) => {
        if(data.error)
        {
           
            forecastParagraph.innerHTML = data.error
        }
        else
        {
            forecastParagraph.innerHTML = data.weather.weather_descriptions
        }
    })
})
})