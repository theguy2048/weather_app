const path = require('path');
const express = require('express');
const hbs = require('hbs');
const Geocode = require('./geocode');
const Forecast = require('./forecast');
const port = process.env.PORT || 3000

const app = express();

const pathdirect = path.join(__dirname,'../public');
const viewdirect = path.join(__dirname,'../template/views');
const partialdirect = path.join(__dirname,'../template/partial');

app.use(express.static(pathdirect));

app.set('view engine','hbs');
app.set('views', viewdirect);
hbs.registerPartials(partialdirect);

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather app",
        name: "Sucheet"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name: "Sucheet"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Enter address'
        })
    }
    Geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }
        Forecast(latitude,longitude,(error,forecastdata)=>{
            if (error){
                return res.send({error});
                }
            res.send({
                address: req.query.address,
                temperature: forecastdata.temperature, 
                forecast_descripation: forecastdata.description,
                wind_dir: forecastdata.wind_dir,
                pressure: forecastdata.pressure,
                humidity: forecastdata.humidity,
                precip: forecastdata.precip,
                obs_time: forecastdata.observation_time,
                location
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        txt : "",
        title: "Help",
        name: "Sucheet"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errormsg : "Page not found",
        title: "Help wala",
        name: "Sucheet"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errormsg : "404 Page not found",
        title: "404 ERROR",
        name: "Sucheet"
    })
})

app.listen(port,()=>{
    console.log("Server chalu");
})
