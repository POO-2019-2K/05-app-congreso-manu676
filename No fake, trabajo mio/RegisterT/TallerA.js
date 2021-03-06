import Courses from "./TallerR.js";

export default class RegisterT {
constructor(tableAgenda, tableInfo) {
this._tableAgenda = tableAgenda;
this._tableInfo = tableInfo;
this._numTalleres = 0;
this._lugaresD = 0;

//array pra localstorage "Talleres"
this._talleres= [];
//localStorage.removeItem("Talleres");
this._initTables();

}

_initTables() {

//LISTA DE TALLERES
let lsTalleres = JSON.parse(localStorage.getItem("Talleres"));
if (lsTalleres === null) {
    return;
}
lsTalleres.forEach((ta,index) => {
    ta.fechaInicio = new Date(ta.fechaInicio);
    ta.fechaFin = new Date(ta.fechaFin);

    this._addToTable(new Courses(ta));
});
}
//cancelar la edicion
_cancelEdit(row, courses){
row.cells[0].innerHTML = "";
row.cells[0].innerHTML = courses.ID; 
row.cells[1].innerHTML = "";   
row.cells[1].innerHTML = courses.nameT;
row.cells[2].innerHTML = "";
row.cells[2].innerHTML= courses.getFechaInicialAsString();
row.cells[3].innerHTML = "";
row.cells[3].innerHTML= courses.getFechaFinalAsString();
row.cells[4].innerHTML = "";
row.cells[4].innerHTML= this._lugaresD
row.cells[5].innerHTML = "";
row.cells[5].innerHTML = courses.duracion;

this._addEditDeleteToRow(row, courses);
}
_saveEdit(row, courses, newCourses){
//Buscar su ubicación 
let pos = this._findID(courses.ID);
this._talleres[pos] = newCourses;
localStorage.setItem("Talleres", JSON.stringify(this._talleres));

this._cancelEdit(row, new Courses(newCourses));
}

//Cambiar la información de los campos, y los botenes de guardar y de cancelar
_editRow(row, courses){
//ID
let ID = document.createElement("input");
ID.type= "text";
ID.value= courses.ID;
row.cells[0].innerHTML= "";
row.cells[0].appendChild(ID);
//Nombre
let iNombre = document.createElement("input");
iNombre.type= "text";
iNombre.value= courses.nameT;
row.cells[1].innerHTML= "";
row.cells[1].appendChild(iNombre);
//fecha Inicio
let fechaI = document.createElement("input");
fechaI.type="date";
fechaI.value= courses.getFechaInicioForDate();
row.cells[2].innerHTML="";
row.cells[2].appendChild(fechaI);
//Fecha Fin
let fechaF = document.createElement("input");
fechaF.type="date";
fechaF.value= courses.getFechaFinForDate();
row.cells[3].innerHTML="";
row.cells[3].appendChild(fechaF);
//Cupos
let iCupo = document.createElement("input");
iCupo.type= "number";
iCupo.value= courses.capacidad;
row.cells[4].innerHTML= "";
row.cells[4].appendChild(iCupo);
//Duracion
let iDuracion = document.createElement("input");
iDuracion.type= "number";
iDuracion.value= courses.duracion;
row.cells[5].innerHTML= "";
row.cells[5].appendChild(iDuracion);
//crear boton de guardar/salvar
let btnSave= document.createElement("input");
btnSave.type = "button";
btnSave.value = "Grabar";
btnSave.className= "btn btn-success"
row.cells[6].innerHTML="";
row.cells[6].appendChild(btnSave);

//evento de guardar
btnSave.addEventListener("click",()=>{
    let newCourses ={
    ID : ID.value,
    nameT : iNombre.value,
    fechaInicio : fechaI.value,
    fechaFin : fechaF.value,
    capacidad : iCupo.value,
    duracion : iDuracion.value
    };
    this._saveEdit(row, courses, newCourses);
    location.reload();
})

//crear boton de cancelar
let btnCancel= document.createElement("input");
btnCancel.type = "button";
btnCancel.value = "Cancelar";
btnCancel.className= "btn btn-danger"
row.cells[7].innerHTML="";
row.cells[7].appendChild(btnCancel);
//evento de cancelar
btnCancel.addEventListener("click", () =>{
    this._cancelEdit(row, courses);
})  
row.cells[8].innerHTML= "";
}  
_addEditDeleteToRow(row, courses){
let btnEdit = document.createElement("input");
btnEdit.type = "button";
btnEdit.value = "Editar";
btnEdit.className = "btn btn-success";
//llamar a un metodo 
btnEdit.addEventListener("click", ()=>{
    this._editRow(row, courses);
    
})

let btnDelete = document.createElement("input");
btnDelete.type = "button";
btnDelete.value = "Eliminar";
btnDelete.className = "btn btn-danger";

let btnInPerson = document.createElement("input");
btnInPerson.type = "button";
btnInPerson.value = "Ingresar Part.";
btnInPerson.className = "btn btn-warning";
btnInPerson.addEventListener("click", ()=>{ 
    localStorage.setItem("idTaller", row.cells[0].innerHTML);
    localStorage.setItem("capacidad", row.cells[4].innerHTML);
    window.location.href='RegistroP/RegistroParticipantes.html';
})
row.cells[6].innerHTML = "";
row.cells[6].appendChild(btnEdit);
row.cells[7].innerHTML = "";
row.cells[7].appendChild(btnDelete);
row.cells[8].innerHTML = "";
row.cells[8].appendChild(btnInPerson);
}

_addToTable(courses) {

this._lugaresD = Number(courses.capacidad);
console.log(this._lugaresD);

//tabla
let row = this._tableAgenda.insertRow(-1);
//En la tabla grande 
let cellID = row.insertCell(0);
let cellNameT = row.insertCell(1);
let cellFechaInicio = row.insertCell(2);
let cellfechaFin = row.insertCell(3);
let cellCapacidad = row.insertCell(4);
let cellDuracion= row.insertCell(5);
row.insertCell(6);
row.insertCell(7);
row.insertCell(8);

cellID.innerHTML= courses.ID;
cellNameT.innerHTML = courses.nameT;
cellFechaInicio.innerHTML = courses.getFechaInicialAsString();
cellfechaFin.innerHTML = courses.getFechaFinalAsString();
cellCapacidad.innerHTML = this._lugaresD;
//cellLugaresO.innerHTML = this._lugaresO;
cellDuracion.innerHTML = courses.duracion;
//llamar a los botones
this._addEditDeleteToRow(row, courses);


this._numTalleres++; // this._numTalleres = this._numTalleres + 1

this._tableInfo.rows[0].cells[1].innerHTML = this._numTalleres;

let objCourse = {
    ID: courses.ID,
    nameT: courses.nameT,
    fechaInicio: courses.fechaInicio,
    fechaFin: courses.fechaFin,
    capacidad: courses.capacidad,
    duracion: courses.duracion
};


this._talleres.push(objCourse);
}

_findID(ID){//encontrar el correoa
let found = -1 

this._talleres.forEach((ta,index)=>{
    if(ta.ID === ID)
    {
    found = index;
    return;
    }
});
return found;
}

addCourses(courses) {
let found = this._findID(courses.ID);
if (found >= 0){
    swal.fire({
    type: "error",
    title: "error",
    text: "El taller ya esta registrado"
    });
    return;
}
//let numPersonas =  localStorage.getItem("numPersonas");
this._addToTable(courses);
localStorage.setItem("Talleres", JSON.stringify(this._talleres));
}
}