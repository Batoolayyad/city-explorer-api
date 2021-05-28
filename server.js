'use strict'

require('dotenv').config();
const express = require('express');
const server = express();
// const weatherData = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT
const axios = require('axios')

server.use(cors())

server.get('/test', (req, res) => {
    let test = 'test'
    res.send(test)
})

server.get('/movie', moviehandler)

server.get('/weather', weatherhandler)

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
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
class Formovie {
    constructor(item) {
        this.title = item.original_title,
            this.overview = item.overview,
            this.averageVotes = item.vote_average,
            this.totalVotes = item.vote_count,
            this.posterPath = `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            this.popularity = item.popularity,
            this.releaseDate = item.release_date
    }
}
async function moviehandler(req, res) {
    let key = process.env.MOVIE_API_KEY;
    let cityName = req.query.city_name;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`

    try {
        let result = await axios.get(url)
        let movieArr = result.data.results.map(item => {
            return new Formovie(item);

        })
        res.send(movieArr);
    }
    catch (errors) {

        res.send('error: the informition that you searched for it are not found' + errors);
    }

}





// //http://localhost:3001/weather?city_name=Amman
// // server.get('/weather', (req, res) => {
// //     // console.log(req.query)
// //     let cityName = req.query.city_name;
// //     let lat = req.query.lati;
// //     // let lon = req.query.lon;
//     let searchQuery = weatherData.find(item => {
//         if (cityName.toLowerCase() == item.city_name.toLowerCase())
//             return item;
//     })
//    console.log(searchQuery );
//     try {
//         let date;
//         let description;
//         let newforecast;

//        let forecastArr= searchQuery.data.map(item=>{
//             // date= item.valid_date
//             // description=item.weather.description
//         return new Forecast(item);
//         // return newforecast;
//         })
//     //     for (let i = 0; i < searchQuery.data.length; i++) {
//     //         date = searchQuery.data[i].valid_date;
//     //         description = `Low of ${searchQuery.data[i].low_temp}, high of ${searchQuery.data[i].max_temp} with ${searchQuery.data[i].weather.description}, date: ${date}`;
//     //         newforecast = new Forecast(date, description);
//     //         forecastArr.push(newforecast);
//     //     }
//          res.send(forecastArr);
//     } 
//     catch (errors) {

//         res.send('error: the informition that you searched for it are not found');
//     }
// })
server.get('*', (req, res) => {
    res.send('not found');
})

server.listen(PORT, () => {
    console.log(`listtening on PORT ${PORT}`)
})
