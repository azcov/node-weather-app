const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url =
        'https://api.darksky.net/forecast/1ad87f3daa25b74948481ecaefc3dce6/' +
        latitude +
        ',' +
        longtitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect darksky', undefined)
        } else if (body.error) {
            callback('error unable to find location', undefined)
        } else {
            callback(undefined, body.daily.summary)
        }
    })
}

module.exports = forecast
