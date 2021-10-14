const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

//Setup static directory to serve 
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// Setup handle bars directory and views location
// This needs to be done if the name of views directory is not views
const viewsDirectory = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
const partialsDirectory = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsDirectory)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Neelkanth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Neelkanth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can I help you',
        name: 'Neelkanth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location)
    {
        res.send({
            error: 'You must provide a location'
        })
    }
    else
    {
        let coords = geocode(req.query.location, (error, coords) => {
            if(!error)
            {
                let weather = forecast(coords.latitude, coords.longitude, (error, data) => {
                    if(!error)
                    {
                        res.send({
                            location: req.query.location,
                            coordinates: coords,
                            weather: data
                        })
                    }
                    else
                    {
                        res.send({
                            error: 'Some error occured while getting the weather forecast.'
                        })
                    }
                })
            }
            else
            {
                res.send({
                    error: 'Some error occured while getting the location coordinates.'
                })
            }
            
        })

    }
})

// Match anything that hasnt been matched so far startung with /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops. Page not found',
        message: 'Help article not found'
    })
})

// Match anything that hasnt been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops. Page not found',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".");
})