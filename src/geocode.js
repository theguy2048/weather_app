const request = require('request');

const Geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhndXkyMDQ4IiwiYSI6ImNrZW53YnRldTE3aXAyenB3YXNhenpqMmMifQ.q_FAiOWhcTmp5ZoHD0HC0g&limit=1';
    request({url, json:true}, (error,{body})=>{
        if (error){
             callback('Connect to internet',undefined)
        } else if (body.features.length === 0){
            callback('Enter correct address',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = Geocode;

