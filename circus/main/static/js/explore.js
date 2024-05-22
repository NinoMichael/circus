'use strict'

const btnExchange = document.getElementById("btn-exchange")
const inputs = document.getElementsByTagName("input")

btnExchange.addEventListener('click', function() {
    if(inputs[0].value != "" && inputs[1].value != "") {
        let temp = inputs[0].value;
        inputs[0].value = inputs[1].value;
        inputs[1].value = temp;
    }
});