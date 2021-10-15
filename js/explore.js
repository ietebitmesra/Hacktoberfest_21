const apiKey = "f985a3ae5df8738bf04a55864c33128c";

    
window.addEventListener('load',  async (e) => {
    e.preventDefault();

    // POPULAR MOVIES
    const popMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=` + `${apiKey}` + `&language=en-US&with_original_language=en&page=1`);
    const trendMovieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    const upcomingMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    const topRatedMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    const freeToWatchMovieRes = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=IN&with_watch_monetization_types=free`)

    const popMovieResult = popMovieRes.data.results
    popMovieResult.forEach(item => {
        divAppender('popular', item.poster_path, item.original_title)
    })
});


const divAppender = (container_class, img_src_path, title)=>{
    const pop_div = document.createElement("div");
    const pop_img = document.createElement("img");
    const pop_name = document.createElement("h6");
    pop_div.append(pop_img);
    pop_div.append(pop_name);
    pop_img.height = '200px';
    pop_img.src = 'https://image.tmdb.org/t/p/w500/'+img_src_path;
    pop_name.innerText = title;

    const container = document.querySelector(`.${container_class}`)
    container.append(pop_div);
}