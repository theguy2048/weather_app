const request = require('request');

const Forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=847cd631885b4ffa57d4111c81e12f95&query='+latitude+','+longitude;
    request({url, json:true}, (error,{body})=>{
        if (error){
             callback('Connect to internet',undefined)
        } else if (body.success === false){ 
            callback('Incorrect URL',undefined)
        } else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                wind_dir: body.current.wind_dir,
                pressure: body.current.pressure,
                humidity: body.current.humidity,
                precip: body.current.precip,
                observation_time: body.current.observation_time
            })
        }
    })
}

module.exports = Forecast;
