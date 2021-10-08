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
    //console.log('clear called');
    document.getElementById('show-image').innerHTML="";
    document.getElementById('show-prim-info').innerHTML="";
    // document.getElementById('data-table').innerHTML=`
    // <tr id="table-headers"></tr>
    // <div id="table-data"></div>
    // `
}

//FORM SUBMISSION EVENT LISTENER
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    //check
    clear_old_data();
    // API CALL
    const searchTerm = document.querySelector('#searchText').value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    console.log(res)
    const bestMatch = res.data[0].show

    // ALL API DATA
    const id = bestMatch.id
    const show_id = id
    const image = bestMatch.image.medium
    // const premeired = bestMatch.image.medium
    const name = bestMatch.name 
    const cast_response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    const cast_data = await cast_response.json();
    let cast_names = 'Cast : '
    cast_data.map(getNames)
    function getNames(value){
        cast_names = cast_names+value.person.name+", ";
    }
    cast_names = cast_names.substring(0,cast_names.length-2)

    let rating = "Rating: " + bestMatch.rating.average + "&nbsp&nbsp";
    let star_ct = bestMatch.rating.average;

    let star_layer0="☆☆☆☆☆☆☆☆☆☆";
    let star_layer1="★★★★★★★★★★";

    const summary = bestMatch.summary
    let strippedString = summary.replace(/(<([^>]+)>)/gi, "");

    // Hiding popular shows section
        pop_show_hide();

 
    // CREATE DOM ELEMENTS HERE
    const img = document.createElement('IMG');    
    img.src = image;
    const h1 = document.createElement('H1');
    h1.innerText = name;
    const p1 = document.createElement('p');
    p1.innerText = strippedString;
    const cast = document.createElement('cast');
    cast.innerText = cast_names;
    

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
    


    // STYLE CREATED ELEMENTS HERE
    h1.style.fontSize = '50px';

    p1.style.fontFamily= 'Courgette, cursive';
    p1.style.fontSize= '22px';
    p1.style.fontWeight= '100'

    cast.style.fontFamily = 'Arial, Helvetica, sans-serif'
    cast.style.fontWeight = '100'
    cast.style.fontSize = '20px';
    cast.style.display = 'block'
    cast.style.fontColor = "white"

    avg_rating.style.fontSize='20px';
    star_bottom.style='z-index: 1;  position:absolute; display: inline-block; overflow: hidden; white-space: nowrap;';
    star_top.style='z-index: 2;   position:absolute ; overflow: hidden; white-space: nowrap; height:24px; display: inline-block; color:gold;';

    // APPEND ELEMENTS TO WEB PAGE
    resultDivImg.append(img)
    resultDivInfo.append(h1)
    resultDivInfo.append(p1)
    resultDivInfo.append(avg_rating)
    resultDivInfo.append(cast)
    showSecInfo();
    form.reset();


    // SECONDARY INFO
    const season_num = 1
    const season_disp = document.querySelector('#season-num');
    season_disp.innerText = `SEASON: ${season_num}`

    let wid=star_bottom.offsetWidth;
    wid=wid*star_ct*0.1;
    wid=Math.ceil(wid); //to make it slightly more accurate
    star_top.style.width=wid+'px';
    avg_rating.style.minWidth=wid+50+'px';

    // EPISODE TABLE
    get_season(show_id, season_num)

})

const popShowSection = document.querySelector("#popular-shows")
const secInfo = document.querySelector("#sec-info")

const pop_show_hide = ()=>{
    popShowSection.classList.add('hidden');
}

const showSecInfo = ()=>{
    secInfo.classList.remove('hidden')
}

const get_season = async(show_id, season_num)=>{
    const season_data = await axios.get(`https://api.tvmaze.com/shows/${show_id}/seasons`)
    const season_id = season_data.data[season_num-1].id
    console.log(season_data)
    const ep_data = ep_data_fill(season_id)
}

const ep_data_fill = async(season_id)=>{
    const episode_data = await axios.get(`https://api.tvmaze.com/seasons/${season_id}/episodes`)
    console.log(episode_data.data[0])
    const l = episode_data.data.length
    headers.innerHTML = heads;
    console.log(headers);
    for(var i=0; i<l; i++){
        var number = episode_data.data[i].number;
        var date = episode_data.data[i].airdate;
        var name = episode_data.data[i].name;
        var runtime = episode_data.data[i].runtime;
        tableGenerator(number, name, date, runtime)
    }
}


 // GENERATION OF TABLES
const table = document.querySelector('#data-table')
const headers = document.querySelector('#table-headers')
const table_data = document.querySelector('#table-data')

const heads = '<th style="width: 13%;padding-left:30px">Number</th><th style="width: 30%;">Date</th><th style="width: 50%;">Name</th><th style="width: 17%;">Runtime</th>';


const tableGenerator = (ep_number, ep_name, ep_date, ep_runtime)=>{
    var r = document.createElement('tr')
    var row = `<td style="padding-left:30px">${ep_number}</td><td>${ep_date}</td><td>${ep_name}</td><td>${ep_runtime}</td>`
    r.innerHTML = row;
    table.append(r);
}

