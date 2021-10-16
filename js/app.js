//MAIN DATA IS ALREADY FETCHED
//TO LEARN MORE ABOUT THIS API endpoints VISIT 'https://www.tvmaze.com/api' 
//YOU JUST NEED TO SAVE A PARTICULAR ONE YOU NEED IN A VARIABLE
//RENDER IT ON PAGE AS USER INPUTS A NAMED
//INITIALY ONLY IMAGE AND SERIES NAME IS RENDERED ON SCREEN AS SEARCHES
//TRY TO SHOW MORE DATA AS NEEDED(PROPERLY)
//SOME DATA LIKE SUMMARY AND RATING IS ALREADY SAVED YOU JUST NEED TO APPEND INITIALY
//ADD GOOD FONTS
//MAKE UI BETTER
//IF YOU FIND ANY ISSUE WHICH YOU ARE NOT ABLE TO FIX YOU CAN ALWAYS OPEN YOUR OWN ISSUE ON GITHUB
//SEE CODE PROPERLY YOU'LL GET IDEA OF MOST OF IT
//MAKE PROPER COMMENTS WHERE-EVER NECESSARY

const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const form = document.querySelector('.searchForm');
const resultDiv = document.querySelector('#main-info')
const resultDivImg = document.querySelector('#show-image')
const resultDivInfo = document.querySelector('#show-prim-info')
const searchResult = document.querySelector('#searchResult')


//SHOW INFO WHEN CLICKED
function show_info(show_name){
    document.querySelector('#searchText').value=show_name;
    let btn_clicked=document.querySelector('#searchBtn');
    btn_clicked.click();
}

//CLEARDIV
function clear_old_data(){
    document.getElementById('show-image').innerHTML="";
    document.getElementById('show-prim-info').innerHTML="";
    document.getElementById('data-table').innerHTML="";
    document.getElementById("cast_data").innerHTML="";
    document.getElementById("EpisodeHeading").classList.add("active-b");
    document.getElementById("castHeading").classList.remove("active-b");
}

//FORM SUBMISSION EVENT LISTENER
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    //check
    clear_old_data();
    // API CALL
    const searchTerm = document.querySelector('#searchText').value;
    const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`);
    const bestMatch = res.data.results[0];
    const genreIDs = bestMatch.genre_ids;
    const genreRes = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`);
    console.log(genreRes);

    // ALL API DATA
    const id = bestMatch.id;
    const show_id = id;
    global_showid= id;
    const image = `https://image.tmdb.org/t/p/w200/` + bestMatch.poster_path;
    // const premeired = bestMatch.image.medium
    const name = bestMatch.name;
    const credit_response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
    //console.log(credit_response);

    //CREW
    const crew_data = credit_response.data.crew;
    console.log(crew_data)
    global_crewdata=crew_data;
    
    //CAST
    
    const cast_data = credit_response.data.cast;
    global_castdata=cast_data;
    var cast_names = 'Cast : '
    for (let i = 0; i < cast_data.length; i++) {
        cast_names = cast_names + cast_data[i].name + ", ";
    }
    cast_names = cast_names.substring(0,cast_names.length-2)

    let rating = "Rating: " + bestMatch.vote_average + "&nbsp&nbsp";
    let star_ct = bestMatch.vote_average;

    let star_layer0="☆☆☆☆☆☆☆☆☆☆";
    let star_layer1="★★★★★★★★★★";

    const summary = bestMatch.overview;
    let strippedString = summary.replace(/(<([^>]+)>)/gi, "");

    // OTT PLATFORMS
    const ottRes = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}/watch/providers?api_key=${API_KEY}`);
    console.log(ottRes);
    let ottNames=0;
    let hasIN=ottRes.data.results;
    if(hasIN.hasOwnProperty('IN')){
        console.log('Supports IN');
        let hasFlat=hasIN.IN;
        if(hasFlat.hasOwnProperty('flatrate')){
            console.log('Has flatrate');
            ottNames=ottRes.data.results.IN.flatrate;
        }
    }

    // Hiding popular shows section
        pop_show_hide();

 
    // CREATE DOM ELEMENTS HERE
    const img = document.createElement('IMG');    
    img.src = image;
    const h1 = document.createElement('H1');
    h1.innerText = name;
    const p1 = document.createElement('p');
    p1.innerText = strippedString;
    const cast = document.createElement('p');
    cast.innerText = cast_names;
    const ott_details = document.createElement('div');

    const avg_rating = document.createElement('p');
    avg_rating.innerHTML= rating;

    //Adding Genres data
    const Genres = document.createElement('p');
    let val = "Genres: ";
    for(var i=0;i<genreIDs.length;i++)
    {
        for (let j = 0; j < genreRes.data.genres.length; j++) {
            if (genreRes.data.genres[j].id == genreIDs[i])
                val += genreRes.data.genres[j].name;
        }
        if(i!=genreIDs.length-1)
        val+=', ';
    }
    val+=".";
    Genres.innerHTML= val;

    const stars = document.createElement('span');
    const star_bottom= document.createElement('div');
    const star_top= document.createElement('div');
    star_bottom.innerHTML=star_layer0;
    star_top.innerHTML=star_layer1;
    stars.append(star_bottom); 
    stars.append(star_top);
    avg_rating.append(stars);

    // STYLE CREATED ELEMENTS HERE
    h1.style.fontSize = '50px';

    const h3 = document.createElement('H3');
    h3.innerText = "Watch on:";
    h3.style.fontSize = '18px'
    h3.style.fontWeight = 'bold'
    h3.style.display = 'inline';

    p1.style.fontFamily= 'Courgette, cursive';
    p1.style.fontSize= '22px';
    p1.style.fontWeight= '100';

    img.style.borderRadius = "15px";
    img.style.width = "250px";

    cast.style.fontFamily = 'Arial, Helvetica, sans-serif'
    cast.style.fontWeight = '100'
    cast.style.fontSize = '20px';
    cast.style.display = 'block'
    cast.style.fontColor = "white"

    avg_rating.style.fontSize='20px';
    
    Genres.style.fontSize='20px';
    star_bottom.style='z-index: 1;  position:absolute; display: inline-block; overflow: hidden; white-space: nowrap;';
    star_top.style='z-index: 2;   position:absolute ; overflow: hidden; white-space: nowrap; height:24px; display: inline-block; color:gold;';

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

    // APPEND ELEMENTS TO WEB PAGE
    resultDivImg.append(img)
    resultDivImg.append(ott_details); //To append watch providers below poster
    resultDivInfo.append(h1)
    resultDivInfo.append(p1)
    resultDivInfo.append(avg_rating)
    resultDivInfo.append(Genres);
    resultDivInfo.append(cast)
    showSecInfo();
    form.reset();


    // SECONDARY INFO
    const season_num = 1;
    const season_disp = document.querySelector('#season-num');
    // season_disp.innerText = `SEASON: ${season_num}`

    let wid=star_bottom.offsetWidth;
    wid=wid*star_ct*0.1;
    wid=Math.ceil(wid); //to make it slightly more accurate
    star_top.style.width=wid+'px';
    avg_rating.style.minWidth=wid+50+'px';

    // EPISODE TABLE
    get_season(show_id, season_num);

})

const popShowSection = document.querySelector("#popular-shows");
const secInfo = document.querySelector("#sec-info");

const pop_show_hide = ()=>{
    popShowSection.classList.add('hidden');
}

const showSecInfo = ()=>{
    secInfo.classList.remove('hidden')
}

const get_season = async(show_id, season_num)=>{
    const season_data = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}/season/${season_num}?api_key=${API_KEY}&language=en-US`);
    console.log(season_data);
    document.getElementById('season').style.display='inline-flex';
    populate_season_count(show_id);
    const season_id = season_data.data.id
    ep_data_fill(show_id, season_num, season_data);
}

const ep_data_fill = async(show_id, season_num, season_data)=>{
    const tv_data = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}?api_key=${API_KEY}&language=en-US`);
    const l = season_data.data.episodes.length;
    headers.innerHTML = heads;
    table.innerHTML='';
    table.append(headers);
    for(var i=0; i<l; i++){
        var number = i+1;
        var date = season_data.data.episodes[i].air_date;
        var name = season_data.data.episodes[i].name;
        var ratings = season_data.data.episodes[i].vote_average.toFixed(1)+'  ⭐️';
        tableGenerator(number, name, date, ratings);
    }
}

 // GENERATION OF TABLES
const table = document.querySelector('#data-table')
const headers = document.querySelector('#table-headers')
const table_data = document.querySelector('#table-data')

const heads = '<th style="width: 13%;padding-left:30px;text-align: center; border-top-left-radius: 10px;">Number</th><th style="width: 30%;text-align: center">Date</th><th style="width: 50%;text-align: center;">Name</th><th style="width: 50%;text-align: center;  border-top-right-radius: 10px;">Ratings</th>';

const tableGenerator = (ep_number, ep_name, ep_date, ep_ratings)=>{
    var r = document.createElement('tr');
    var row = `<td style="padding-left:30px">${ep_number}</td><td>${ep_date}</td><td>${ep_name}</td><td>${ep_ratings}</td>`;
    r.innerHTML = row;
    r.style.textAlign = "center";
    table.append(r);
}

const refill_table = async(show_id, season_num) => {
    const season_data = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}/season/${season_num}?api_key=${API_KEY}&language=en-US`);
    ep_data_fill(show_id, season_num, season_data);
}

const populate_season_count = async(show_id) => {
    const tv_data = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}?api_key=${API_KEY}&language=en-US`);
    const trailer_data = await axios.get(`https://api.themoviedb.org/3/tv/${show_id}/videos?api_key=${API_KEY}&language=en-US`);
    
    const trailer_res = trailer_data.data.results

    if(trailer_data){
    var trailer = trailer_res[0];
    console.log(trailer_data);
    
    trailer_res.forEach(item => {
        if(item.type === 'Trailer'){
            trailer = item;
            
        }
        
    })
    const yt_trailer = document.createElement('a');
            yt_trailer.innerHTML = `<i class="fas fa-play"></i><span style="margin-left: 10px"><b>Watch Trailer</b></span>`;
            yt_trailer.style.color = '#d6d6d6';
            yt_trailer.setAttribute('data-bs-target', '#yt-modal')
            yt_trailer.setAttribute('data-bs-toggle', 'modal')
            const yt_modal_in = document.querySelector('#yt-modal-content')
            yt_modal_in.children[0].src = `https://www.youtube.com/embed/${trailer.key}` 
            resultDivInfo.appendChild(yt_trailer)
   
}


    const total_seasons = tv_data.data.number_of_seasons;
    let S_List = document.getElementById('season');
    let curr_season = 1;
    S_List.innerHTML='';
    for(let i=0;i<total_seasons;i++){
        let list_item=document.createElement('li');
        let s_link=document.createElement('a');
        s_link.href='#!';
        let season_id=tv_data.data.seasons[i].id;
        let refill_command="refill_table("+show_id+ ", " +curr_season+ ")";
        s_link.setAttribute("onclick", refill_command);
        let sn='S';
        let ct=i+1;
        s_link.classList.add("slink");
        if(ct<10){
            sn=sn+'0'+ct;
        }
        else{
            sn=sn+ct;
        }
        s_link.innerHTML=sn;
        list_item.appendChild(s_link);
        S_List.appendChild(list_item);

        const season_links = document.querySelectorAll('.slink')

        season_links[0].classList.add('active-link')

        season_links.forEach((item, i)=>
            item.addEventListener('click', ()=>{
                disableLinks()
                item.classList.add('active-link')
            })
        )
        
        curr_season++;
     }
 }

const disableLinks = ()=>{
    const season_links = document.querySelectorAll('.slink')
    season_links.forEach((item)=>
            item.classList.remove('active-link')
        )
}

var global_castdata,global_showid;

function cast_display(){
    document.getElementById('castHeading').classList.add("active-b");
    document.getElementById('EpisodeHeading').classList.remove("active-b");
    document.getElementById('crewHeading').classList.remove("active-b");
    document.getElementById('cast_data').innerHTML='';
    document.getElementById('crew_data').innerHTML='';
    document.getElementById('data-table').innerHTML='';

    document.getElementById('season').style.display='none';

    let cast_count=global_castdata.length;
    for(let i=0;i<cast_count;i++){
        let cm_img_api = `https://image.tmdb.org/t/p/w200/` + global_castdata[i].profile_path;
        let cm_name_api=global_castdata[i].name;
        let cm_character_api=global_castdata[i].character;

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

        let actorId=global_castdata[i].id;
        cast_member.setAttribute("onclick",`show_cm_metadata('${actorId}')`);
        cast_member.setAttribute("data-toggle","modal");
        cast_member.setAttribute("data-target","#actor-modal");
        //console.log(actorId);

        document.getElementById("cast_data").appendChild(cast_member);

    }

}

function crew_display(){
    console.log('Crew Called')

    document.getElementById('crewHeading').classList.add("active-b");
    document.getElementById('castHeading').classList.remove("active-b");
    document.getElementById('EpisodeHeading').classList.remove("active-b");
    document.getElementById('crew_data').innerHTML='';
    document.getElementById('cast_data').innerHTML='';
    document.getElementById('data-table').innerHTML='';
    document.getElementById('season').style.display='none';

    let crew_count=global_crewdata.length;
    console.log(global_crewdata);
    console.log(global_crewdata.length);
    console.log(global_crewdata[0].name)
    
    for(let i=0;i<crew_count;i++){
        let cm_img_api;
            if(global_crewdata[i].profile_path){
                cm_img_api=`https://image.tmdb.org/t/p/original${global_crewdata[i].profile_path}`; 
            } else {
                cm_img_api='./images/cast-placefiller.jpg';
            }
        //let cm_img_api=global_crewdata[i].person.image.medium;
        let cm_name_api=global_crewdata[i].name;
        let cm_character_api=global_crewdata[i].job;

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

        document.getElementById("crew_data").appendChild(cast_member);

    }

}

function ep_reload(){
    document.getElementById("crewHeading").classList.remove("active-b");
    document.getElementById('castHeading').classList.remove("active-b");
    document.getElementById('EpisodeHeading').classList.add("active-b");
    document.getElementById('cast_data').innerHTML='';
    document.getElementById('crew_data').innerHTML='';
    get_season(global_showid,1);
} 


function clear_metadata(){
    document.getElementById("am-title").innerHTML='';
    document.getElementById("am-body").innerHTML='';
    document.getElementById("actorpic").src='';
}

async function show_cm_metadata(act_id){
    clear_metadata();
    const actor_data=await axios.get(`https://api.themoviedb.org/3/person/${act_id}?api_key=${API_KEY}&language=en-US`);
    console.log(actor_data);
    document.getElementById("am-title").innerHTML=actor_data.data.name;
    document.getElementById("am-body").innerHTML=actor_data.data.biography;
    let img_link='./images/cast-placefiller.jpg';
    if(actor_data.data.profile_path){
        let endpt=actor_data.data.profile_path;
        img_link=`https://image.tmdb.org/t/p/w400/${endpt}`;
    }
    document.getElementById("actorpic").src=img_link;
}