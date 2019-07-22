const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bd935a637cf30df82ae830152c91a02b/'+latitude+','+longitude
    
    request({url, json: true}, (error, {body}) => {
        if(error){
           callback('No se puede acceder al servicio climato', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
         } else {
             callback(undefined, body.daily.data[0].summary + ' Actualmente está a '+body.currently.temperature+' grados. Hay un '+body.currently.precipProbability+'% de probabilidades de que llueva.')
         }
     })
}

module.exports = forecast