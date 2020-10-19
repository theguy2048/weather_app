const wform = document.querySelector('form');
const search = document.querySelector('input');
const m1 = document.querySelector('#One');
const m2 = document.querySelector('#Two'); 
const m3 = document.querySelector('#Three');
const m4 = document.querySelector('#Four');
const m5 = document.querySelector('#Five');
const m6 = document.querySelector('#Six');
const m7 = document.querySelector('#Seven');
const m8 = document.querySelector('#Eight');

wform.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const location = search.value;
    m1.textContent = 'Loading...'
    m2.textContent = ""
    m3.textContent = ''
    m4.textContent = ''
    m5.textContent = ''
    m6.textContent = ''
    m7.textContent = ''
    m8.textContent = ''

    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            m1.textContent = data.error
        } else{
            m1.textContent = "Loaction: " + data.location;
            m2.textContent = "Temparture: " + data.temperature;   
            m3.textContent = "Forecast Description: " + data.forecast_descripation
            m4.textContent = "Precipitation: " + data.precip;
            m5.textContent = "Humidity: " + data.humidity;
            m6.textContent = "Pressure: " + data.pressure;
            m7.textContent = "Wind direction: " + data.wind_dir;
            m8.textContent = "Local time: " + data.localtime;
        }
    })
})
})