"use strict";
var forma = document.getElementById("forma"),
    salida = document.getElementById("salida"),
    zapato = forma["zapato"],
    imagen= " ";

zapato.addEventListener("change", validaZapato, false);

function validaZapato() {

var zapato = forma["zapato"].value;
 switch (zapato) {
    case "pharrel":
        imagen = '<img src="img/PW.jpg" alt="Pharrel" width="500" height="300" />';
	document.getElementById("salida").innerHTML = imagen;
      break;
    case "yeezy":
        imagen = '<img src="img/YB.jpg" alt="Yeezy Bosst" width="500" height="300" />';
	document.getElementById("salida").innerHTML = imagen;
      break;
      case "retro":
        imagen = '<img src="img/NR.jpg" alt="Nike Retro" width="500" height="300" />';
	document.getElementById("salida").innerHTML = imagen;
      break;
      case "vans":
        imagen = '<img src="img/Vans.jpg" alt="Vans" width="500" height="500" />';
        document.getElementById("salida").innerHTML = imagen;
      break;

  }
}
