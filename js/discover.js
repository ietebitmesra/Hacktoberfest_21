const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`
const genreList  = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const genre_ul = document.querySelector('.genre-list')
console.dir(genre_ul)
const genre_btns = document.querySelectorAll('.genre-btns')

const genreMaker = (gen_name, gen_id)=>{
    const li  = document.createElement('li')
    li.classList.add('genre-btns')
    li.setAttribute('id', `genID:${gen_id}`)
    li.innerText = gen_name;
    genre_ul.append(li)
}

genreList.forEach(item => {
    const name = item.name;
    const id = item.id;
    genreMaker(name, id)
})

genre_ul.addEventListener('click',(e)=>{
    var selectedGenre = []
    e.target.classList.toggle('active-c')
    for(var i = 3; i< genre_ul.childNodes.length; i++)
    {
        if(genre_ul.childNodes[i].classList.contains('active-c'))
            selectedGenre.push(genre_ul.childNodes[i].id.slice(6))
    }
    console.log(selectedGenre)
    displayMovie(selectedGenre)
})

let movieList=document.getElementById("suggested-mv-list");

const displayMovie = async(genre)=>{
    var gen= genre.toString()
    const res = await axios.get(BASE_URL+gen+'&page=1')
    console.log(res);
    let mv_list=res.data.results;
    console.log(mv_list);
    if(mv_list.length==0){
        console.log('Nothing there!');
    }
    for(let i=0;i<mv_list.length;i++){
        let mv_cont=document.createElement("div");
        mv_cont.classList.add("col-lg-3");
        mv_cont.classList.add("col-sm-6");
        mv_cont.classList.add("col-12");

        let mvcard=document.createElement("div");
        mvcard.classList.add("card");
        mvcard.classList.add("border-0");
        mvcard.classList.add("mb-2");
        mvcard.classList.add("tv-card");

        let mv_img=document.createElement("img");
        mv_img.src="https://picsum.photos/200/300";

        mvcard.appendChild(mv_img);

        mv_cont.appendChild(mvcard);

        //console.log(mv_cont);
        movieList.appendChild(mv_cont);
    }
    console.log('ok');
}