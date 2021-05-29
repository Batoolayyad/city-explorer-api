
const axios = require('axios');

module.exports = weatherhandler;


class Forecast {
        constructor(item) {
            this.date = item.valid_date;
            this.description = `low of ${item.min_temp}, hight of ${item.max_temp}, with ${item.weather.description}`;
        }
    }
    
    async function weatherhandler(req, res) {
        let key = process.env.WEATHER_API_KEY;
        let cityName = req.query.city_name;
    
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&days=4`
    
        try {
            let result = await axios.get(url)
    
            let forecastArr = result.data.data.map(item => {
                return new Forecast(item);
                // return newforecast;
            })
    
            res.send(forecastArr);
            console.log(forecastArr);
        }
        catch (errors) {
    
            res.send('error: the informition that you searched for it are not found ' + errors);
        }
    
    }