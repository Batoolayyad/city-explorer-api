const axios = require('axios'); 


module.exports = moviehandler;

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
let momiers=[];

async function moviehandler(req, res) {
    let key = process.env.MOVIE_API_KEY;
    let cityName = req.query.city_name;

    if (momiers[cityName] !== undefined){
        console.log('this data from memory');
        res.send(momiers[cityName]);
    }else{
        console.log('this data from API');

        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`
    
        try {
            let result = await axios.get(url)
            let movieArr = result.data.results.map(item => {
                return new Formovie(item);
    
            })  
            momiers[cityName]=movieArr;
            res.send(movieArr);
        }
        catch (errors) {
    
            res.send('error: the informition that you searched for it are not found' + errors);
        }
    };


}


