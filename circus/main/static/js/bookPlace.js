'use strict';

const btnPlaces = document.querySelectorAll('button.place');
const warningPlace = document.getElementById('text-warningPlace');
const btnSubmit2 = document.getElementById('btnSubmit2');

for (const btnPlace of btnPlaces) {
    btnPlace.addEventListener('click', function(e) {
        e.preventDefault();
        if(!btnPlace.classList.contains('bg-yellow')) {
            btnPlace.classList.remove('bg-white');
            btnPlace.classList.remove('shadow');
            btnPlace.classList.add('bg-yellow');
            btnPlace.classList.add('selected');
        } else {
            btnPlace.classList.remove('selected');
            btnPlace.classList.remove('bg-yellow');
            btnPlace.classList.add('bg-white');
            btnPlace.classList.add('shadow');
        }
    });

    btnSubmit2.addEventListener('click', function(e){
        e.preventDefault();
        if(!btnPlace.classList.contains('selected')) {
            warningPlace.innerHTML = '<p id = "text-warning" class = "text-danger"><i class = "fa fa-times-circle me-2"></i>Veuillez sélectionner votre place durant le voyage</p>';
        }
    });
}






