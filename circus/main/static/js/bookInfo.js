'use strict';

const btnSubmitInfo = document.getElementById('btnSubmitInfo');
const inputsBook = document.getElementsByTagName('input');
const textWarning = document.getElementById('text-warning');

btnSubmitInfo.addEventListener('click', function(e) {
    e.preventDefault();
    if(inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == "") {
       warningMessage("Veuillez remplir les champs du formulaire");
    }

    if(!/^[0-9][0-9]$/.test(inputs[5].value) ) {
        warningMessage("Age invalide. Veuillez réessayer");
     }

    if(!/.@gmail.com$/.test(inputs[4].value) ) {
        warningMessage("Adresse e-mail non valide. Veuillez réessayer");
     }

    if(!/^[0-9][0-9]$/.test(inputs[5].value) ) {
       warningMessage("Le nombre de réservants est invalide. Veuillez réessayer");
    }
});

function warningMessage(message) {
    textWarning.innerHTML = '<p id = "text-warning" class = "text-danger"><i class = "fa fa-times-circle me-2"></i>'+ message +'</p>';
}

