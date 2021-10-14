const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const MOVIE_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&vote_average.gte=6.5&with_original_language=en&with_genres=`;
const TV_BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&vote_average.gte=6.5&with_genres=`;
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

const tvBtn = document.querySelector("#tv");
const movieBtn = document.querySelector("#movies");

const suggestMoviesSection = document.querySelector("#suggested-movies");
const suggestTVSection = document.querySelector("#suggested-tv");
suggestMoviesSection.classList.add("hidden");
suggestTVSection.classList.add("hidden");

// MOVIE BUTTON
movieBtn.addEventListener("click", async (e) => {
  suggestMoviesSection.classList.remove("hidden");
  suggestTVSection.classList.add("hidden");
  e.preventDefault();

  movie_genre_ul.classList.remove('hidden');

  movie_genre_ul.addEventListener("click", (e) => {
    if (e.target !== movie_genre_ul) {
      // This if prevents the ul box from being toggleable
      var selectedGenre = [];
      e.target.classList.toggle("active-c");
      for (var i = 3; i < movie_genre_ul.childNodes.length; i++) {
        if (movie_genre_ul.childNodes[i].classList.contains("active-c"))
          selectedGenre.push(movie_genre_ul.childNodes[i].id.slice(6));
      }
      console.log(selectedGenre);
      displayMovie(selectedGenre);
    }
  });
});

// TV SHOW BUTTON
tvBtn.addEventListener("click", async (e) => {
  suggestTVSection.classList.remove("hidden");
  suggestMoviesSection.classList.add("hidden");
  e.preventDefault();

  tv_genre_ul.classList.remove('hidden');
  movie_genre_ul.classList.add('hidden');

  tv_genre_ul.addEventListener("click", (e) => {
    if (e.target !== tv_genre_ul) {
      // This if prevents the ul box from being toggleable
      var selectedGenre = [];
      e.target.classList.toggle("active-c");
      for (var i = 3; i < tv_genre_ul.childNodes.length; i++) {
        if (tv_genre_ul.childNodes[i].classList.contains("active-c"))
          selectedGenre.push(tv_genre_ul.childNodes[i].id.slice(6));
      }
      console.log(selectedGenre);
      displayTV(selectedGenre);
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
  movie_genre_ul.append(li);
};

const tvGenreMaker = (gen_name, gen_id) => {
  const li = document.createElement("li");
  li.classList.add("genre-btns");
  li.setAttribute("id", `genID:${gen_id}`);
  li.innerText = gen_name;
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

      let mvcard = document.createElement("div");
      mvcard.classList.add("card");
      mvcard.classList.add("border-0");
      mvcard.classList.add("mb-2");
      mvcard.classList.add("tv-card");

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
