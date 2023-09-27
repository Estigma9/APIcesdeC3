
//let urlText = 'http://www.omdbapi.com/?apikey=23daade9'

//http://www.omdbapi.com/?apikey=23daade9

//let urlPoster = 'http://img.omdbapi.com/?apikey=23daade9'


const getSearchText = ()=>{
    const submit = document.getElementById('submit');
    
    submit.addEventListener('click', async (e)=>{
        e.preventDefault();

        let promise = new Promise((resolve, reject)=>{
            const movieSearchTitle = document.getElementById('movieSearchTitle').value ? document.getElementById('movieSearchTitle') : false;

            console.log(movieSearchTitle);

            if(movieSearchTitle){
                resolve();
            } else {
                console.log("Rechazado");
                reject();
            }
        });

        promise.then(
            await(testApi(movieSearchTitle.value)),
            error => console.log(error),
        );
    });
};

getSearchText();


const testApi = async (movieSearch)=>{

    //Petición de la información
    let urlText = `http://www.omdbapi.com/?t=${movieSearch}&type=movie&apikey=23daade9`;

    const resultText = await fetch(urlText, {
        method: 'GET',
    });

    let dataText = await resultText.json();
    console.log(dataText);

    //Petición Poster
    let urlPoster = `http://img.omdbapi.com/?i=${dataText.imdbID}&type=movie&apikey=23daade9`;

    const resultPoster = await fetch(urlPoster, {
        method: 'GET',
    });

    let dataPoster = await resultPoster.url;
    console.log(dataPoster);

    //Llamada a la función  pintar
    printMovies(dataText, dataPoster);

    return dataText

    // if(resultText.ok){
    //     console.log(resultText);
    //     // console.log(resultJson);
    // }
};


const printMovies = async(dataText, dataPoster) =>{

    let cardMovie = document.getElementById('cardMovie');

    cardMovie.innerHTML = "";

    const moviePoster = document.createElement('img');
    moviePoster.className = 'card-img-top';
    moviePoster.src = dataPoster;
    moviePoster.alt = dataPoster.Title;

    const movieTitle = document.createElement('h4');
    movieTitle.classList = 'card-title pt-4 pl-2';
    movieTitle.textContent = dataText.Title.toUpperCase();
    

    cardMovie.appendChild(moviePoster);
    cardMovie.appendChild(movieTitle);

};

