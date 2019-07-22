const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVybmFuZG9jaGMiLCJhIjoiY2p5OTdraW8yMDE5ZjNib2F1MmEwN241YyJ9.gIwrgSafmujBwWv06DEuAA&limit=1&language=es'

    request({url, json:true }, (error, {body}) => {
        if(error){
            callback('No se puede accesar al sitio web', undefined)
        } else if (body.features.length == 0) {
            callback('No se puede accesar al sitio web. Try again!', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode