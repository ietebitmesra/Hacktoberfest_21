const apiKey = "f985a3ae5df8738bf04a55864c33128c";
const moviesBtn = document.querySelector('#movies');
const tvBtn = document.querySelector('#tv');

// DISPLAY MOVIES
window.addEventListener('load',  async (e) => {
  e.preventDefault();
  
  moviesBtn.classList.add('active-e');
  moviesBtn.classList.remove('explore');
  // POPULAR MOVIES
    const popMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=` + `${apiKey}` + `&language=en-US&with_original_language=en&page=1`);
    const trendMovieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    const upcomingMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    const topRatedMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    const freeToWatchMovieRes = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=IN&with_watch_monetization_types=free`)

    //console.log('TR',topRatedMovieRes);
    //console.log('FTW',freeToWatchMovieRes);

    const popMovieResult = popMovieRes.data.results;
    divclear('popular');
    popMovieResult.forEach(item => {
        divAppender('popular', item.poster_path, item.original_title);
    });

    const trendMovieResult = trendMovieRes.data.results;
    divclear('trending');
    trendMovieResult.forEach(item=>{
        divAppender('trending',item.poster_path, item.original_title);
    });

    const upcomingMovieResult = upcomingMovieRes.data.results;
    divclear('upcoming');
    upcomingMovieResult.forEach(item=>{
        divAppender('upcoming',item.poster_path, item.original_title);
    });

    const topRatedMovieResult = topRatedMovieRes.data.results;
    divclear('top-rated');
    topRatedMovieResult.forEach(item=>{
        divAppender('top-rated',item.poster_path, item.original_title);
    });

    const freeToWatchMovieResult = freeToWatchMovieRes.data.results;
    divclear('free');
    freeToWatchMovieResult.forEach(item=>{
        divAppender('free',item.poster_path, item.original_title);
    });
});

moviesBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  moviesBtn.classList.add('active-e');
  moviesBtn.classList.remove('explore');
  tvBtn.classList.add('explore');
  tvBtn.classList.remove('active-e');

  document.querySelector('.upcoming-heading').classList.remove('hidden');
  document.querySelector('.upcoming').classList.remove('hidden');
  // POPULAR MOVIES
    const popMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=` + `${apiKey}` + `&language=en-US&with_original_language=en&page=1`);
    const trendMovieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    const upcomingMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    const topRatedMovieRes = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    const freeToWatchMovieRes = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=IN&with_watch_monetization_types=free`)

    //console.log('TR',topRatedMovieRes);
    //console.log('FTW',freeToWatchMovieRes);

    const popMovieResult = popMovieRes.data.results;
    divclear('popular');
    popMovieResult.forEach(item => {
        divAppender('popular', item.poster_path, item.original_title);
    });

    const trendMovieResult = trendMovieRes.data.results;
    divclear('trending');
    trendMovieResult.forEach(item=>{
        divAppender('trending',item.poster_path, item.original_title);
    });

    const upcomingMovieResult = upcomingMovieRes.data.results;
    divclear('upcoming');
    upcomingMovieResult.forEach(item=>{
        divAppender('upcoming',item.poster_path, item.original_title);
    });

    const topRatedMovieResult = topRatedMovieRes.data.results;
    divclear('top-rated');
    topRatedMovieResult.forEach(item=>{
        divAppender('top-rated',item.poster_path, item.original_title);
    });

    const freeToWatchMovieResult = freeToWatchMovieRes.data.results;
    divclear('free');
    freeToWatchMovieResult.forEach(item=>{
        divAppender('free',item.poster_path, item.original_title);
    });
});

tvBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  moviesBtn.classList.remove('active-e');
  moviesBtn.classList.add('explore');
  tvBtn.classList.remove('explore');
  tvBtn.classList.add('active-e');

  document.querySelector('.upcoming-heading').classList.add('hidden');
  document.querySelector('.upcoming').classList.add('hidden');
  // POPULAR MOVIES
    const popTvRes = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=` + `${apiKey}` + `&language=en-US&with_original_language=en&page=1`);
    const trendTvRes = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`)
    const topRatedTvRes = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    const freeToWatchTvRes = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=IN&with_watch_monetization_types=free`)

    console.log(popTvRes);
    //console.log('TR',topRatedMovieRes);
    //console.log('FTW',freeToWatchMovieRes);

    const popTvResult = popTvRes.data.results;
    divclear('popular');
    popTvResult.forEach(item => {
        divAppender('popular', item.poster_path, item.name);
    });

    const trendTvResult = trendTvRes.data.results;
    divclear('trending');
    trendTvResult.forEach(item=>{
        divAppender('trending',item.poster_path, item.name);
    });

    const topRatedTvResult = topRatedTvRes.data.results;
    divclear('top-rated');
    topRatedTvResult.forEach(item=>{
        divAppender('top-rated',item.poster_path, item.name);
    });

    const freeToWatchTvResult = freeToWatchTvRes.data.results;
    divclear('free');
    freeToWatchTvResult.forEach(item=>{
        divAppender('free',item.poster_path, item.name);
    });
});


const divclear = (container_class) =>{
    //added this to remove old data
    document.querySelector(`.${container_class}`).innerHTML='';
}

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
const element1 = document.querySelector(".popular");
const element2 = document.querySelector(".trending");
const element3 = document.querySelector(".upcoming");
const element4 = document.querySelector(".top-rated");
const element5 = document.querySelector(".free");
element1.addEventListener('wheel', (event) => {
  event.preventDefault();
  element1.scrollBy({
    left: event.deltaY < 0 ? -30 : 30,
  });
});
element2.addEventListener('wheel', (event) => {
    event.preventDefault();
    element2.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });
  element3.addEventListener('wheel', (event) => {
    event.preventDefault();
    element3.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });
  element4.addEventListener('wheel', (event) => {
    event.preventDefault();
    element4.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });
  element5.addEventListener('wheel', (event) => {
    event.preventDefault();
    element5.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });