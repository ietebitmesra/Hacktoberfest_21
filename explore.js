const apiKey = "f985a3ae5df8738bf04a55864c33128c";
const movie_card = document.querySelectorAll('.movie-card');
const movie_img = document.querySelectorAll('.movie-img');
const tv_card = document.querySelectorAll('.tv-card');
const tv_img = document.querySelectorAll('.tv-img');
    
window.addEventListener('load',  async (e) => {
    e.preventDefault();

    // POPULAR MOVIES
    const MovieRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=` + `${apiKey}` + `&language=en-US&page=1`);
    console.log(MovieRes);

    // POPULAR TV SHOWS
    const TvRes = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=` + `${apiKey}` + `&language=en-US&page=1`);
    console.log(TvRes);

    // MOVIE CARDS
    for (let i = 0; i < 4; i++) {
        var div = document.createElement('DIV');
        div.classList.add('card-body');

        var h5 = document.createElement('H5');
        h5.classList.add('card-title');

        h5.append(MovieRes.data.results[i].original_title);
        div.append(h5);
        
        var poster = "https://image.tmdb.org/t/p/w200/" + MovieRes.data.results[i].poster_path;
        movie_img[i].setAttribute('src', poster);

        movie_card[i].append(div);
    }

    // TV SHOWS CARDS
    for (let i = 0; i < 4; i++) {
       
        var div = document.createElement('DIV');
        div.classList.add('card-body');

        var h5 = document.createElement('H5');
        h5.classList.add('card-title');

        h5.append(TvRes.data.results[i].name);
        div.append(h5);
        
        var poster = "https://image.tmdb.org/t/p/w200/" + TvRes.data.results[i].poster_path;
        tv_img[i].setAttribute('src', poster);

        tv_card[i].append(div);
    }
});
