const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const formMovies = document.querySelector('#movieSearchForm');
const resultSection = document.querySelector('#movie_result');
const favorteMovieSection  = document.querySelector('#favourite-movies')
const similar_movie_section = document.querySelector('#similar-movies')
const btn = document.getElementsByClassName("open");
const secondry_info = document.querySelector('#sec-info')
function show_info(show_name){
    document.querySelector('#searchText').value=show_name;
    let btn_clicked=document.querySelector('#searchBtn');
    btn_clicked.click();
}

for(var i=0;i<btn.length;i++)
{
    
btn[i].onclick=function(){
    document.querySelector('#searchText').value=this.innerText;
    formMovies.dispatchEvent(new Event('submit'));
    };
    
}

formMovies.addEventListener('submit', async(e) => {
    e.preventDefault();
    // API CALL
    const SearchMovie = document.querySelector('#searchText').value;

    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=` + `${API_KEY}&query=` + `${SearchMovie}`);
    const bestMatch = res.data.results[0];

    // API DATA
    const poster = "https://image.tmdb.org/t/p/w200/" + bestMatch.poster_path;
    const movie_id = bestMatch.id;
    const name = bestMatch.title;
    const summary = bestMatch.overview;
    let strippedString = summary.replace(/(<([^>]+)>)/gi, "");
    // CAST
    const cast_res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`);
    let cast_names = 'Cast : ';
    for (let i = 0; i < 8; i++) {
        cast_names += cast_res.data.cast[i].name + ", ";
    }
    //console.log(cast_names);

    // RATING
    let rating = "Rating: " + bestMatch.vote_average + "&nbsp&nbsp";
    let star_ct = bestMatch.vote_average;

    let star_layer0="☆☆☆☆☆☆☆☆☆☆";
    let star_layer1="★★★★★★★★★★";

    // OTT PLATFORMS
    const ottRes = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}`);
    console.log(ottRes);
    const ottNames = ottRes.data.results.IN.flatrate;

    // Movie Trailer
    const yt_trailer = document.createElement('a');
    yt_trailer.innerHTML = `<i class="fas fa-play"></i><span style="margin-left: 10px"><b>Watch Trailer</b></span>`;
    // yt_trailer.href = 'https://www.youtube.com/watch?v='+(await get_trailer(movie_id));
    yt_trailer.style.color = '#d6d6d6';
    yt_trailer.setAttribute('data-bs-target', '#yt-modal')
    yt_trailer.setAttribute('data-bs-toggle', 'modal')
    const yt_modal_in = document.querySelector('#yt-modal-content')
    yt_modal_in.children[0].src = 'https://www.youtube.com/embed/'+ (await get_trailer(movie_id))


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
     const ott_details = document.createElement('div');
     
     const img = document.createElement('IMG');    
     img.src = poster;
     const h3 = document.createElement('H3');
     h3.innerText = "Watch on:";
     h3.style.fontSize = '18px'
     h3.style.fontWeight = 'bold'
     const title = document.createElement('H1');
     title.innerText = name;
     const info = document.createElement('p');
     info.innerText = strippedString;
     const cast = document.createElement('p');
     cast.innerText = cast_names;
     
     ott_details.style.textAlign='center';
     ott_details.append(h3);
     for (let i = 0; i < ottNames.length; i++) {
         const LOGO = document.createElement('img');
         LOGO.style.display = 'inline';
         LOGO.style.margin = '10px';
         LOGO.style.borderRadius = '10px';
         const logo = `https://image.tmdb.org/t/p/original`+ ottNames[i].logo_path;
         LOGO.src = logo;
         LOGO.style.width='35px' 
         LOGO.style.height='35px'         
         ott_details.append(LOGO);
     }


    // STYLE CREATED ELEMENTS HERE
    h3.style.display = 'inline';
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
    resultDiv.style.margin = "20px";
    resultDiv.style.marginTop = "40px";

    avg_rating.style.fontSize='20px';
    star_bottom.style='z-index: 1;  position:absolute; display: inline-block; overflow: hidden; white-space: nowrap;';
    star_top.style='z-index: 2;   position:absolute ; overflow: hidden; white-space: nowrap; height:24px; display: inline-block; color:gold;';

    favorteMovieSection.classList.add('hidden')

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
    secondry_info.classList.remove('hidden')
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

    // CAST RENDERING LOOP
    let cast_count=cast_res.data.cast.length;
    console.log(cast_count)
    for(let i=0;i<cast_count;i++){
        let cm_img_api=''
        if(cast_res.data.cast[i].profile_path){
            cm_img_api=`https://image.tmdb.org/t/p/original${cast_res.data.cast[i].profile_path}`; 
        } else {
            cm_img_api='./images/cast-placefiller.jpg'
        }
        
        let cm_name_api=cast_res.data.cast[i].name;
        let cm_character_api=cast_res.data.cast[i].character;

        let cast_member=document.createElement('li')
        let cm_card=document.createElement('div');
        cm_card.style.display="inline-block";
        cm_card.classList.add("card");
        cm_card.classList.add("border-0");
        cm_card.classList.add("mb-2");
        cm_card.classList.add("tvcard");
        cm_card.classList.add("cardshow");

        let cm_img=document.createElement('img');
        cm_img.src=cm_img_api;
        cm_img.classList.add('cast-card');
        cm_img.classList.add('border-0');
        cm_img.classList.add('card__image');
        let cm_metadata=document.createElement('div');
        
        let cm_name=document.createElement('h5');
        let cm_character=document.createElement('h6');
        cm_name.innerHTML=cm_name_api;
        cm_name.classList.add("card-title");

        cm_character.innerHTML=cm_character_api;

        cm_metadata.appendChild(cm_name);
        cm_metadata.appendChild(cm_character);

        cm_metadata.classList.add("card-body");
        cm_card.appendChild(cm_img);
        cm_card.appendChild(cm_metadata);

        cast_member.appendChild(cm_card);

        cm_card.style.width="14rem";

        document.getElementById("cast_data").appendChild(cast_member);

    }


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

const make_recommendations = async(id)=>{
    await getRecom(id)
    for(var i = 0; i < 12; i++){
        const name = similar_movie_object[i].name
        const img_src = similar_movie_object[i].poster_src
        const ratings = similar_movie_object[i].ratings
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

//Gets link for movie trailer
const get_trailer = async(id)=>{
    const res = await axios.get(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
    const key = res.data.results[0].key
    return key
}
