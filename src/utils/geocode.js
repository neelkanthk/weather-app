const request = require('postman-request')

const geocode = (address, callback) => {
    const geocodeUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmVlbGthbnRoa2F1c2hpayIsImEiOiJja3R1MXVpdmswNm42Mm5tcGdrd3hzb3RhIn0.JgS8A3OR8iVzH1lhxZWvDw'

    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error)
        {
            callback(error, undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('Location not found.', undefined)
        }
        else
        {
            let latitude = response.body.features[0].center[1]
            let longitude = response.body.features[0].center[0]
            data = {
                latitude: latitude,
                longitude: longitude
            }
            callback(undefined, data)
        }
        
    })
}

module.exports = geocode