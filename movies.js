const apiKey = "f985a3ae5df8738bf04a55864c33128c";
const formMovies = document.querySelector('#movieSearchForm');
const resultSection = document.querySelector('#movie_result');
const favorteMovieSection  = document.querySelector('#favourite-movies')

formMovies.addEventListener('submit', async(e) => {
    e.preventDefault();
    // API CALL
    const SearchMovie = document.querySelector('#searchText').value;

    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=` + `${apiKey}&query=` + `${SearchMovie}`);
    console.log(res);
    const bestMatch = res.data.results[0];

    // API DATA
    const poster = "https://image.tmdb.org/t/p/w200/" + bestMatch.poster_path;
    const movie_id = bestMatch.id;
    const name = bestMatch.title;
    const summary = bestMatch.overview;
    let strippedString = summary.replace(/(<([^>]+)>)/gi, "");

    // CAST
    const cast_res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}&language=en-US`);
    console.log(cast_res);
    let cast_names = 'Cast : ';
    for (let i = 0; i < 8; i++) {
        cast_names += cast_res.data.cast[i].name + ", ";
    }

    // RATING
    let rating = "Rating: " + bestMatch.vote_average + "&nbsp&nbsp";
    let star_ct = bestMatch.vote_average;

    let star_layer0="☆☆☆☆☆☆☆☆☆☆";
    let star_layer1="★★★★★★★★★★";

    // DOM ELEMENTS
    const avg_rating = document.createElement('p');
    avg_rating.innerHTML= rating;
    const stars = document.createElement('span');
    const star_bottom= document.createElement('div');
    const star_top= document.createElement('div');
    star_bottom.innerHTML=star_layer0;
    star_top.innerHTML=star_layer1;
    stars.append(star_bottom); 
    stars.append(star_top);
    avg_rating.append(stars);

     const resultDiv = document.createElement('div');
     const resultDivImg = document.createElement('div');
     const resultDivInfo = document.createElement('div');
     
     const img = document.createElement('IMG');    
     img.src = poster;
     const title = document.createElement('H1');
     title.innerText = name;
     const info = document.createElement('p');
     info.innerText = strippedString;
     const cast = document.createElement('p');
     cast.innerText = cast_names;

    // STYLE CREATED ELEMENTS HERE
    title.style.fontSize = '50px';
    img.style.borderRadius = "10px";
    img.style.width = "220px";

    info.style.fontFamily= 'Courgette, cursive';
    info.style.fontSize= '25px';
    info.style.fontWeight= '100';

    cast.style.fontFamily = 'Arial, Helvetica, sans-serif';
    cast.style.fontWeight = '100';
    cast.style.fontSize = '20px';
    cast.style.display = 'block';
    cast.style.fontColor = "white";

    resultDiv.style.display = "flex";
    resultDivImg.style.margin = "30px"
    resultDiv.style.alignItems = "center";

    avg_rating.style.fontSize='20px';
    star_bottom.style='z-index: 1;  position:absolute; display: inline-block; overflow: hidden; white-space: nowrap;';
    star_top.style='z-index: 2;   position:absolute ; overflow: hidden; white-space: nowrap; height:24px; display: inline-block; color:gold;';

    favorteMovieSection.classList.add('hidden')
    
    resultDivImg.append(img);
    resultDivInfo.append(title);
    resultDivInfo.append(info);
    resultDivInfo.append(avg_rating)
    resultDivInfo.append(cast);
    resultDiv.append(resultDivImg);
    resultDiv.append(resultDivInfo);
    resultSection.append(resultDiv);
    formMovies.reset();

    if (resultSection.childElementCount >= 1) {
        resultSection.removeChild(resultSection.firstChild);
    }


    let wid=star_bottom.offsetWidth;
    wid=wid*star_ct*0.1;
    wid=Math.ceil(wid); //to make it slightly more accurate
    star_top.style.width=wid+'px';
    avg_rating.style.minWidth=wid+50+'px';
})