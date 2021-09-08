getDataByCat('comedy')
getDataByCat('action')
getDataByCat('sci-fi')
getDataByBest()


var modal = document.getElementById("modalBox");
var span = document.getElementsByClassName("close")[0];
let body = document.getElementsByTagName('body')[0]

/* Faire apparaitre la modal Box */ 

function showModal(movieid) {
    
    /* Se connecte a l'API avec l'url et recupere les infos grace à la fonction GET */

    let url = "http://localhost:8000/api/v1/titles/" + movieid;
    $.get(url).done(getFilmInfos);
    modal.style.display = "block";
    document.getElementsByClassName('container')[0].style.filter = 'blur(5px)';
    body.style.overflowY = 'hidden';
};

span.onclick = function () {
    modal.style.display = "none";
    body.style.overflowY = 'visible';
    document.getElementsByClassName('container')[0].style.filter = 'none'
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflowY = 'visible';
        document.getElementsByClassName('container')[0].style.filter = 'none'


  }
};

let getFilmInfos = function(data) {

    /* Enregistre toutes les infos dans une variable */

    let title = document.getElementById('movie-title');
    let desc = document.getElementById('desc');
    let imdb = document.getElementById('imdb');
    let date = document.getElementById('date');
    let sec = document.getElementsByClassName('section');
    let image = document.getElementById('modal-image');

    /* Affcihe les infos recuperés sur l'API */

    title.innerHTML = data.title  + " - " + data.duration + "min";
    desc.innerHTML = data.description;
    date.innerHTML = data.year;
    imdb.innerHTML = "Imdb: " + data.imdb_score;
    sec[0].innerHTML = data.genres;
    sec[1].innerHTML = data.rated;
    sec[2].innerHTML = data.metascore + "/100";
    sec[3].innerHTML = data.directors;
    sec[4].innerHTML = data.actors;
    sec[5].innerHTML = data.countries;
    sec[6].innerHTML = data.worldwide_gross_income + " entrés";
    image.src = data.image_url;
};


function getDataByBest() {
    let resultsp1;
    let resultsp2;
    let results;
    let url_page1 = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
    let url_page2 = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2';

    $.get(url_page1).done(
        function(data) {
            resultsp1 = data.results;

            $.get(url_page2).done(
                function(data) {
                    resultsp2 = data.results;
                
                    results = resultsp1.concat(resultsp2);
        
                    changeContentForBest(results)
                }
            );
        }
    );

}

function changeContentForBest(data) {

    let best = document.getElementById('best-movie');
    let button = document.getElementById('best-button');
    let bestdesc = document.getElementById('best-desc');
    let besttitle = document.getElementById('best-title')

    let bestimg = best.getElementsByTagName('img')[0];
    bestimg.src = data[0].image_url;
    bestimg.alt = data[0].title;
    button.setAttribute('onclick','showModal(' + data[0].id + ')');
    besttitle.innerHTML = data[0].title


    $.get('http://localhost:8000/api/v1/titles/' + data[0].id).done(
        function(data) {
            bestdesc.innerHTML = data.long_description
        })
    


    let slider = document.getElementById('best');
    let sliders = slider.getElementsByClassName('movie_item');

    for (let i = 0; i < sliders.length; i++) {

        let img = sliders[i].getElementsByTagName('img')[0];
        img.src = data[i+1].image_url;
        img.alt = data[i+1].title;
        img.setAttribute('onclick','showModal(' + data[i+1].id +')' )

      };

    
      
};


function getDataByCat(genre) {

    let resultsp1;
    let resultsp2;
    let results;
    let url_page1 = 'http://localhost:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score';
    let url_page2 = 'http://localhost:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score&page=2';

    $.get(url_page1).done(
        function(data) {
            resultsp1 = data.results;

            $.get(url_page2).done(
                function(data) {
                    resultsp2 = data.results;
                
                    results = resultsp1.concat(resultsp2);
        
                    getCatInfo(genre, results)
                }
            );
        }
    );
};


function getCatInfo(genre, data) {

    let slider = document.getElementById(genre);
    let sliders = slider.getElementsByClassName('movie_item');


    for (let i = 0; i < sliders.length; i++) {

        let img = sliders[i].getElementsByTagName('img')[0];
        img.src = data[i].image_url;
        img.alt = data[i].title;
        img.setAttribute('onclick','showModal(' + data[i].id +')' )

      };
      
};



function moveLeft(sliderid) {
    let slider, slidercontent, textIndent;

    slider = document.getElementById(sliderid);

    if (!slider) return false;

    slidercontent = slider.getElementsByClassName('slidercontent')[0]; 

    textIndent = parseInt(slider.style.textIndent || 0);
    
    slider.style.textIndent=(textIndent-25)+"%";

    slider.getElementsByClassName('arrow left')[0].style.visibility = "visible";


    if (slider.style.textIndent >= -50+"%")  {
       slider.style.textIndent= -50+"%";
       slider.getElementsByClassName('arrow right')[0].style.visibility = "hidden";    
    };

    return true;
};

function moveRight(sliderid) {
    let slider, slidercontent, textIndent;

    slider = document.getElementById(sliderid);

    if (!slider) return false;

    slidercontent = slider.getElementsByClassName('slidercontent')[0];

    textIndent = parseInt(slider.style.textIndent || 0);
    
    slider.style.textIndent=(textIndent+25)+"%";

    slider.getElementsByClassName('arrow right')[0].style.visibility = "visible";

    if (slider.style.textIndent >= 0+"%")  {
        slider.style.textIndent=(0)+"%";
        slider.getElementsByClassName('arrow left')[0].style.visibility = "hidden";
    };

    return true;
};

setTimeout(function(){ document.getElementById('loading').style.display = 'none'; }, 1000);