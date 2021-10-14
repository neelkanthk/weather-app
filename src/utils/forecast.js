const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f8e6c1943ffa24d160b462ba84293168&query=' + latitude + ','+longitude
    request({url: url, json: true}, (error, response) => {
        if (error)
        {
            callback('Something went wrong')
        }
        else if (response.body.error)
        {
            callback(response.body.error)
        }
        else 
        {
            callback(undefined, response.body.current)
        }
    })
}

module.exports = forecast