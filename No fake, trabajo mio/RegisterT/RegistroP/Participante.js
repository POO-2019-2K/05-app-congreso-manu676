import RegisterP from "./PartiA.js";
import People from "./PartiR.js";

class Main {
constructor() {
    console.log(localStorage.getItem("taller"))
let agenda = new RegisterP(
    document.querySelector("#agenda"),
    document.querySelector("#info")
);

document.querySelector("#btnAdd").addEventListener("click", () => {
    let form = document.querySelector("#form");

    if (form.checkValidity() === true) {
    let name = document.querySelector("#name").value;
    let fechaC = document.querySelector("#fechaC").value;
    fechaC = fechaC.split("-");

    let cumpleaños = new Date(fechaC[0], fechaC[1] - 1, fechaC[2]);

    let email = document.querySelector("#email").value;

    let objPersonas = {
        name: name,
        cumpleaños: cumpleaños,
        email: email
    };

    let participantesR = new People(objPersonas);

    agenda.addPeople(participantesR);
    }

    form.classList.add("was-validated"); 
});
}
}

let m = new Main();
