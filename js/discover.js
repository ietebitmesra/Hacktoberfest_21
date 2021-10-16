const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const MOVIE_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&vote_average.gte=6.5&with_original_language=en&with_genres=`;
const TV_BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&vote_average.gte=6.5&with_genres=`;
const formMovies = document.querySelector('#movieSearchForm');
const resultSection = document.querySelector('#movie_result');
const suggestedMovieSection = document.querySelector('#suggested-movies');
const suggestedTvSection = document.querySelector('#suggested-tv');

// PAGINATION BAR
var pageItems = document.querySelectorAll('.page-item');
var prevBtn = document.querySelector('.previousBtn');
var nextBtn = document.querySelector('.nextBtn');

function show_info(show_name, type = 'movie') {
  document.querySelector('#searchText').value = show_name;
  document.querySelector('#searchType').value = type;
  let btn_clicked = document.querySelector('#searchBtn');
  btn_clicked.click();
}
const movieGenreList = [
  { id: 28, name: "Action", },
  { id: 12, name: "Adventure", },
  { id: 16, name: "Animation", },
  { id: 35, name: "Comedy", },
  { id: 80, name: "Crime", },
  { id: 99, name: "Documentary", },
  { id: 18, name: "Drama", },
  { id: 10751, name: "Family", },
  { id: 14, name: "Fantasy", },
  { id: 36, name: "History", },
  { id: 27, name: "Horror", },
  { id: 10402, name: "Music", },
  { id: 9648, name: "Mystery", },
  { id: 10749, name: "Romance", },
  { id: 878, name: "Science Fiction", },
  { id: 10770, name: "TV Movie", },
  { id: 53, name: "Thriller", },
  { id: 10752, name: "War", },
  { id: 37, name: "Western", },
]

const tvGenreList = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

const selectedTvGenre = [];
const selectedMovieGenre = [];

const tvBtn = document.querySelector("#tv");
const movieBtn = document.querySelector("#movies");

const suggestMoviesSection = document.querySelector("#suggested-movies");
const suggestTVSection = document.querySelector("#suggested-tv");
suggestMoviesSection.classList.add("hidden");
suggestTVSection.classList.add("hidden");

// MOVIE BUTTON
movieBtn.addEventListener("click", async (e) => {
  // remove result if discover button is clicked
  while (resultSection.childElementCount >= 1) {
    resultSection.removeChild(resultSection.firstChild);
  }

  // feedback: set active as selected
  tvBtn.classList.remove('active-c');
  // add selected class for elemet target not contain it
  if (!movieBtn.classList.contains("active-c")) {
    movieBtn.classList.add('active-c');
  }

  suggestMoviesSection.classList.remove("hidden");
  suggestTVSection.classList.add("hidden");
  e.preventDefault();

  movie_genre_ul.classList.remove('hidden');
  tv_genre_ul.classList.add('hidden');

  // select all movie genres by default is empty array
  displayMovie(selectedMovieGenre);

  for (let i = 4; i < pageItems.length-1; i++) {
    pageItems[i].classList.add('hidden');
  }
  for (let i = 1; i <= 3; i++) {
    pageItems[i].classList.remove('hidden');
  }
  
  var currPage=1, limitPage = 3;
  nextBtn.addEventListener('click', () => {
    if(currPage === 10) {
      nextBtn.innerHTML = '<li class="page-item nextBtn"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    }
    else if (currPage < (10 - limitPage)) {
      pageItems[currPage].classList.add('hidden');
      pageItems[currPage+limitPage].classList.remove('hidden');
      currPage++;
    }
    else {
      currPage++;
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currPage === 1) {
      prevBtn.innerHTML = '<li class="page-item previousBtn"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    }
    else {
      pageItems[currPage+limitPage-1].classList.add('hidden');
      pageItems[currPage-1].classList.remove('hidden');
      currPage--;
    }
  });
});

// TV SHOW BUTTON
tvBtn.addEventListener("click", async (e) => {
  // remove result if discover button is clicked
  while (resultSection.childElementCount >= 1) {
    resultSection.removeChild(resultSection.firstChild);
  }

  // feedback: set active as selected
  movieBtn.classList.remove('active-c');
  // add selected class for elemet target not contain it
  if (!tvBtn.classList.contains("active-c")) {
    tvBtn.classList.add('active-c');
  }

  suggestTVSection.classList.remove("hidden");
  suggestMoviesSection.classList.add("hidden");
  e.preventDefault();

  tv_genre_ul.classList.remove('hidden');
  movie_genre_ul.classList.add('hidden');

  // select all tv genres by default
  displayTV(selectedTvGenre);

  for (let i = 4; i < pageItems.length-1; i++) {
    pageItems[i].classList.add('hidden');
  }
  for (let i = 1; i <= 3; i++) {
    pageItems[i].classList.remove('hidden');
  }
  
  var currPage=1, limitPage = 3;
  nextBtn.addEventListener('click', () => {
    if(currPage === 10) {
      nextBtn.innerHTML = '<li class="page-item nextBtn"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    }
    else if (currPage < (10 - limitPage)) {
      pageItems[currPage].classList.add('hidden');
      pageItems[currPage+limitPage].classList.remove('hidden');
      currPage++;
    }
    else {
      currPage++;
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currPage === 1) {
      prevBtn.innerHTML = '<li class="page-item previousBtn"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    }
    else {
      pageItems[currPage+limitPage-1].classList.add('hidden');
      pageItems[currPage-1].classList.remove('hidden');
      currPage--;
    }
  });
});

const tv_genre_ul = document.querySelector(".tv-genre-list");
console.dir(tv_genre_ul);
const movie_genre_ul = document.querySelector(".movie-genre-list");
console.dir(movie_genre_ul);
const genre_btns = document.querySelectorAll(".genre-btns");

const movieGenreMaker = (gen_name, gen_id) => {
  const li = document.createElement("li");
  li.classList.add("genre-btns");
  li.setAttribute("id", `genID:${gen_id}`);
  li.innerText = gen_name;
  // add evet listener for eac li/genre element
  li.addEventListener('click', function(e) {
    // if contains then push item
    li.classList.toggle("active-c");
    if (li.classList.contains("active-c"))
      selectedMovieGenre.push(li.id.slice(6));

    // if not contains then splice items
    if (!li.classList.contains("active-c")) {
      const index = selectedMovieGenre.indexOf(li.id.slice(6))
      selectedMovieGenre.splice(index, 1)
    }

    console.log(selectedMovieGenre)
    displayMovie(selectedMovieGenre)
  }, false);
  movie_genre_ul.append(li);
};

const tvGenreMaker = (gen_name, gen_id) => {
  const li = document.createElement("li");
  li.classList.add("genre-btns");
  li.setAttribute("id", `genID:${gen_id}`);
  li.innerText = gen_name;
  // add evet listener for eac li/genre element
  li.addEventListener('click', function(e) {
    // if contains then push item
    li.classList.toggle("active-c");
    if (li.classList.contains("active-c"))
      selectedTvGenre.push(li.id.slice(6));

    // if not contains then splice items
    if (!li.classList.contains("active-c")) {
      const index = selectedTvGenre.indexOf(li.id.slice(6))
      selectedTvGenre.splice(index, 1)
    }

    console.log(selectedTvGenre)
    displayTV(selectedTvGenre)
  }, false);
  tv_genre_ul.append(li);
};

movieGenreList.forEach((item) => {
    const name = item.name;
    const id = item.id;
    movieGenreMaker(name, id);
});

tvGenreList.forEach((item) => {
    const name = item.name;
    const id = item.id;
    tvGenreMaker(name, id);
});

let movieList = document.getElementById("suggested-mv-list");
let tvList = document.getElementById("suggested-tv-list");

const displayMovie = async (genre) => {
  movieList.innerHTML = "";
  var gen = genre.toString();
  const res = await axios.get(MOVIE_BASE_URL + gen + "&page=1");
  console.log(res);
  let mv_list = res.data.results;
  //console.log(mv_list);
  if (mv_list.length == 0) {
    let no_res = document.createElement("div");
    var mv_img = document.createElement("img");
    mv_img.className = "mv_img";
    let no_mv = document.createElement("div");
    no_mv.className = "no_mv";
    mv_img.src = `./images/EmptyFolder.png`;
    no_mv.innerHTML = "No movies available!";
    no_res.appendChild(mv_img);
    no_res.appendChild(no_mv);
    movieList.appendChild(no_res);
  } else {
    for (let i = 0; i < mv_list.length; i++) {
      let mv_cont = document.createElement("div");
      mv_cont.classList.add("col-lg-3");
      mv_cont.classList.add("col-sm-6");
      mv_cont.classList.add("col-12");
      mv_cont.addEventListener("click", function() {
        show_info(mv_list[i].original_title, 'movie')
      }, false)

      let mvcard = document.createElement("div");
      
      mvcard.classList.add("card");
      mvcard.classList.add("border-0");
      mvcard.classList.add("mb-2");
      mvcard.classList.add("tv-card");
      mvcard.classList.add("cardshow");

      mv_img = document.createElement("img");
      mv_img.classList.add("card-img-top");
      mv_img.classList.add("border-0");
      
      if (mv_list[i].poster_path) {
        mv_img.src = `https://image.tmdb.org/t/p/w400/${mv_list[i].poster_path}`;
      } else {
        mv_img.src = "./images/cast-placefiller.jpg";
      }

      let mv_name = document.createElement("div");
      mv_name.classList.add("card-body");

      let mv_name_title = document.createElement("h5");
      mv_name_title.innerHTML = mv_list[i].original_title;
      mv_name_title.classList.add("card-title");
      mv_name_title.style.color = "white";
      mv_name_title.style.textAlign = "center";

      mv_name.appendChild(mv_name_title);

      mvcard.appendChild(mv_img);
      mvcard.appendChild(mv_name);

      mv_cont.appendChild(mvcard);

      movieList.appendChild(mv_cont);
      mv_img.style.height = "280px";
      mv_img.style.height = "300px";
      mv_img.style.objectFit = "contain";
    }
  }
};

const displayTV = async (genre) => {
  tvList.innerHTML = "";
  var gen = genre.toString();
  const res = await axios.get(TV_BASE_URL + gen + "&page=1");
  console.log(res);
  let tv_list = res.data.results;
  //console.log(mv_list);
  if (tv_list.length == 0) {
    let no_res = document.createElement("div");
    var tv_img = document.createElement("img");
    tv_img.className = "tv_img";
    let no_tv = document.createElement("div");
    no_tv.className = "no_tv";
    tv_img.src = `./images/EmptyFolder.png`;
    no_tv.innerHTML = "No movies available!";
    no_res.appendChild(tv_img);
    no_res.appendChild(no_tv);
    movieList.appendChild(no_res);
  } else {
    for (let i = 0; i < tv_list.length; i++) {
      let tv_cont = document.createElement("div");
      tv_cont.classList.add("col-lg-3");
      tv_cont.classList.add("col-sm-6");
      tv_cont.classList.add("col-12");
      tv_cont.addEventListener("click", function() {
        show_info(tv_list[i].original_name, 'tv')
      }, false)

      let tvcard = document.createElement("div");
      tvcard.classList.add("card");
      tvcard.classList.add("border-0");
      tvcard.classList.add("mb-2");
      tvcard.classList.add("tv-card");

      tv_img = document.createElement("img");
      tv_img.classList.add("card-img-top");
      tv_img.classList.add("border-0");
      if (tv_list[i].poster_path) {
        tv_img.src = `https://image.tmdb.org/t/p/w400/${tv_list[i].poster_path}`;
      } else {
        tv_img.src = "./images/cast-placefiller.jpg";
      }

      let tv_name = document.createElement("div");
      tv_name.classList.add("card-body");

      let tv_name_title = document.createElement("h5");
      tv_name_title.innerHTML = tv_list[i].name;
      tv_name_title.classList.add("card-title");
      tv_name_title.style.color = "white";
      tv_name_title.style.textAlign = "center";

      tv_name.appendChild(tv_name_title);

      tvcard.appendChild(tv_img);
      tvcard.appendChild(tv_name);

      tv_cont.appendChild(tvcard);

      tvList.appendChild(tv_cont);
      tv_img.style.height = "280px";
      tv_img.style.height = "300px";
      tv_img.style.objectFit = "contain";
    }
  }
};

// add function ready pure javascript
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}

ready(function() {
  // add movie as default category
  movieBtn.click()
  displayMovie([]);
});

formMovies.addEventListener('submit', async (e) => {
  e.preventDefault();
  // API CALL
  const SearchName = document.querySelector('#searchText').value;
  const SearchType = document.querySelector('#searchType').value || "movie";

  const res = await axios.get(`https://api.themoviedb.org/3/search/${SearchType}?api_key=` + `${API_KEY}&query=` + `${SearchName}`);
  console.log("Res", res);
  const bestMatch = res.data.results[0];

  // API DATA
  const poster = "https://image.tmdb.org/t/p/w200/" + bestMatch.poster_path;
  const movie_id = bestMatch.id;
  const name = bestMatch.title || bestMatch.name;
  const summary = bestMatch.overview;
  let strippedString = summary.replace(/(<([^>]+)>)/gi, "");
  // CAST
  const cast_res = await axios.get(`https://api.themoviedb.org/3/${SearchType}/${movie_id}/credits?api_key=${API_KEY}&language=en-US`);
  let cast_names = 'Cast : ';
  if (Array.isArray(cast_res.data.cast) && cast_res.data.cast.length) {
    for (let i = 0; i < 8; i++) {
      if (cast_res.data.cast[i]) {
        cast_names += cast_res.data.cast[i].name + ", ";
      }
    }
  }
  cast_names = cast_names.substring(0,cast_names.length-2)
  //console.log(cast_names);

  // RATING
  let rating = "Rating: " + bestMatch.vote_average + "&nbsp&nbsp";
  let star_ct = bestMatch.vote_average;

  let star_layer0 = "☆☆☆☆☆☆☆☆☆☆";
  let star_layer1 = "★★★★★★★★★★";

  // OTT PLATFORMS
  const ottRes = await axios.get(`https://api.themoviedb.org/3/${SearchType}/${movie_id}/watch/providers?api_key=${API_KEY}`);
  console.log(ottRes);
  let ottNames = 0;
  let hasIN = ottRes.data.results;
  if (hasIN.hasOwnProperty('IN')) {
      console.log('Supports IN');
      let hasFlat = hasIN.IN;
      if (hasFlat.hasOwnProperty('flatrate')) {
          console.log('Has flatrate');
          ottNames = ottRes.data.results.IN.flatrate;
      }
  }

  // Movie Trailer
  const yt_trailer = document.createElement('a');
  yt_trailer.innerHTML = `<i class="fas fa-play"></i><span style="margin-left: 10px"><b>Watch Trailer</b></span>`;
  // yt_trailer.href = 'https://www.youtube.com/watch?v='+(await get_trailer(movie_id));
  yt_trailer.style.color = '#d6d6d6';
  yt_trailer.setAttribute('data-bs-target', '#yt-modal')
  yt_trailer.setAttribute('data-bs-toggle', 'modal')
  const yt_modal_in = document.querySelector('#yt-modal-content')
  yt_modal_in.children[0].src = 'https://www.youtube.com/embed/' + (await get_trailer(movie_id, SearchType))


  const avg_rating = document.createElement('p');
  avg_rating.innerHTML = rating;
  const stars = document.createElement('span');
  const star_bottom = document.createElement('div');
  const star_top = document.createElement('div');
  star_bottom.innerHTML = star_layer0;
  star_top.innerHTML = star_layer1;
  stars.append(star_bottom);
  stars.append(star_top);
  avg_rating.append(stars);

  const resultDiv = document.createElement('div');
  const resultDivImg = document.createElement('div');
  const resultDivInfo = document.createElement('div');
  const ott_details = document.createElement('div');

  // adding class to some HTML which is generated by JS
  resultDiv.classList.add("moviesInfoContainer"); // div of movie image and it's detail stuff
  resultDivImg.classList.add("moviesImg");
  resultDivInfo.classList.add("moviesDetails"); // div of movies details only

  const img = document.createElement('IMG');
  img.src = poster;
  const h3 = document.createElement('H3');
  if(ottNames.length>0){
      h3.innerText = "Watch on:";
  }
  h3.style.fontSize = '18px'
  h3.style.fontWeight = 'bold'
  const title = document.createElement('H1');
  title.innerText = name;
  const info = document.createElement('p');
  info.innerText = strippedString;
  const cast = document.createElement('p');
  cast.innerText = cast_names;

  ott_details.style.textAlign = 'center';
  ott_details.append(h3);
  for (let i = 0; i < ottNames.length; i++) {
      const LOGO = document.createElement('img');
      LOGO.style.display = 'inline';
      LOGO.style.margin = '10px';
      LOGO.style.borderRadius = '10px';
      const logo = `https://image.tmdb.org/t/p/original` + ottNames[i].logo_path;
      LOGO.src = logo;
      LOGO.style.width = '35px'
      LOGO.style.height = '35px'
      ott_details.append(LOGO);
  }


  // STYLE CREATED ELEMENTS HERE
  h3.style.display = 'inline';
  title.style.fontSize = '50px';
  img.style.borderRadius = "10px";
  img.style.width = "220px";

  info.style.fontFamily = 'Courgette, cursive';
  info.style.fontSize = '25px';
  info.style.fontWeight = '100';

  cast.style.fontFamily = 'Arial, Helvetica, sans-serif';
  cast.style.fontWeight = '100';
  cast.style.fontSize = '20px';
  cast.style.display = 'block';
  cast.style.fontColor = "white";

  resultDiv.style.display = "flex";
  resultDivImg.style.margin = "30px"
  resultDiv.style.alignItems = "center";
  resultDiv.style.margin = "20px";
  resultDiv.style.marginTop = "40px";

  avg_rating.style.fontSize = '20px';
  star_bottom.style = 'z-index: 1;  position:absolute; display: inline-block; overflow: hidden; white-space: nowrap;';
  star_top.style = 'z-index: 2;   position:absolute ; overflow: hidden; white-space: nowrap; height:24px; display: inline-block; color:gold;';

  suggestedMovieSection.classList.add('hidden')
  suggestedTvSection.classList.add('hidden')
  movie_genre_ul.classList.add('hidden')
  tv_genre_ul.classList.add('hidden')

  if (resultSection.childElementCount >= 1) {
    resultSection.removeChild(resultSection.firstChild);
  }

  resultDivImg.append(img);

  resultDivInfo.append(title);
  resultDivInfo.append(info);
  resultDivInfo.append(avg_rating);
  resultDivInfo.append(cast);
  resultDivInfo.append(yt_trailer);
  resultDivImg.append(ott_details); //To append watch providers below poster
  resultDiv.append(resultDivImg);
  resultDiv.append(resultDivInfo);
  resultSection.append(resultDiv);

  formMovies.reset();

  let wid = star_bottom.offsetWidth;
  wid = wid * star_ct * 0.1;
  wid = Math.ceil(wid); //to make it slightly more accurate
  star_top.style.width = wid + 'px';
  avg_rating.style.minWidth = wid + 50 + 'px';
})

//Gets link for movie trailer
const get_trailer = async (id, SearchType) => {
  const res = await axios.get(`http://api.themoviedb.org/3/${SearchType}/${id}/videos?api_key=${API_KEY}`)
  const results = res.data.results
  var key = res.data.results[0] && res.data.results[0].key || null
  results.forEach((item)=>{
      if(item.type === 'Trailer'){
          key = item.key
          return key
      }
  })
  return key
}

