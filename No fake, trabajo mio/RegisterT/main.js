import RegisterT from "./TallerA.js";
import Courses from "./TallerR.js";

class Main {
constructor() {
let agenda = new RegisterT(
    document.querySelector("#agenda"),
    document.querySelector("#info")
);

document.querySelector("#btnAdd").addEventListener("click", () => {
    let form = document.querySelector("#form");

    if (form.checkValidity() === true) {
    let ID = document.querySelector("#ID").value;
    let nameT = document.querySelector("#name").value;
    let fechaInicial = document.querySelector("#fechaI").value;
    fechaInicial = fechaInicial.split("-");

    let fechaInicio = new Date(fechaInicial[0], fechaInicial[1] - 1, fechaInicial[2]);

    let fechafinal = document.querySelector("#fechaF").value;
    fechafinal = fechafinal.split("-");

    let fechaFin = new Date(fechafinal[0], fechafinal[1] - 1, fechafinal[2]);

    let capacidad = document.querySelector("#cap").value;
    let duracion = document.querySelector("#tiempo").value;

    let objCourses = {
        ID: ID,
        nameT : nameT,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        capacidad: capacidad,
        duracion: duracion
    };

    let course = new Courses(objCourses);

    agenda.addCourses(course);
    }

    form.classList.add("was-validated"); 
});
}
}

let m = new Main();
