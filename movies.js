const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const formMovies = document.querySelector('#movieSearchForm');
const resultSection = document.querySelector('#movie_result');
const favorteMovieSection  = document.querySelector('#favourite-movies')
const similar_movie_section = document.querySelector('#similar-movies')

formMovies.addEventListener('submit', async(e) => {
    e.preventDefault();
    // API CALL
    const SearchMovie = document.querySelector('#searchText').value;

    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=` + `${API_KEY}&query=` + `${SearchMovie}`);
    console.log(res);
    const bestMatch = res.data.results[0];

    // API DATA
    const poster = "https://image.tmdb.org/t/p/w200/" + bestMatch.poster_path;
    const movie_id = bestMatch.id;
    const name = bestMatch.title;
    const summary = bestMatch.overview;
    let strippedString = summary.replace(/(<([^>]+)>)/gi, "");

    // CAST
    const cast_res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`);
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
    similar_movie_section.classList.remove('hidden')

    if (resultSection.childElementCount >= 1) {
        resultSection.removeChild(resultSection.firstChild);
    }


    let wid=star_bottom.offsetWidth;
    wid=wid*star_ct*0.1;
    wid=Math.ceil(wid); //to make it slightly more accurate
    star_top.style.width=wid+'px';
    avg_rating.style.minWidth=wid+50+'px';
    make_recommendations(movie_id)
})

// TO GET SIMILAR MOVIES
var similar_movie_object = {}

const getRecom = async(id)=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`)
    const recom_data = res.data.results
    recom_data.forEach((rec, i) => {
            similar_movie_object[i] = {
                id: rec.id,
                name: rec.original_title,
                ratings: rec.vote_average,
                poster_src: 'https://image.tmdb.org/t/p/w500'+rec.backdrop_path,
            }
    })
}

const rec_car_item1 = document.querySelector('#rec_car_item1 .recs')
const rec_car_item2 = document.querySelector('#rec_car_item2 .recs')
const rec_car_item3 = document.querySelector('#rec_car_item3 .recs')
console.dir(rec_car_item3)

const make_recommendations = async(id)=>{
    await getRecom(id)
    for(var i = 0; i < 12; i++){
        const name = similar_movie_object[i].name
        const img_src = similar_movie_object[i].poster_src
        const ratings = similar_movie_object[i].ratings
        console.log(name)
        if(i<4){
            rec_car_item1.children[i].children[0].src = img_src
            rec_car_item1.children[i].children[0].nextElementSibling.children[0].innerText = name
            rec_car_item1.children[i].children[0].nextElementSibling.children[1].innerText = ratings.toFixed(1)+' ⭐️'
        }
        if(i>=4 && i<8){
            rec_car_item2.children[i-4].children[0].src = img_src
            rec_car_item2.children[i-4].children[0].nextElementSibling.children[0].innerText = name
            rec_car_item2.children[i-4].children[0].nextElementSibling.children[1].innerText = ratings.toFixed(1)+' ⭐️'
        }
        if(i>=8 && i<12){
            rec_car_item3.children[i-8].children[0].src = img_src
            rec_car_item3.children[i-8].children[0].nextElementSibling.children[0].innerText = name
            rec_car_item3.children[i-8].children[0].nextElementSibling.children[1].innerText = ratings.toFixed(1)+' ⭐️'
        }
    }

}