request = require('request');

const forecast = (lat, long, location, callback) => {
    const url = 'https://api.darksky.net/forecast/371c90be688fb251ac7853f564f75358/'+ lat + ',' + long;
    
    request({url:url, json:true}, (error, {body}) => {

        if (error) {
           callback('Unable to connect to weather data', undefined);
        } else if (body.code === 400) {
            callback('Error: ' + body.error, undefined);
        } else {
            callback(undefined, {body}); 
        }//else
    });   
}//const forecast

module.exports = forecast;