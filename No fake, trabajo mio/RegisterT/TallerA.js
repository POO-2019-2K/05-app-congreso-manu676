import Courses from "./TallerR.js";

export default class RegisterT {
constructor(tableAgenda, tableInfo) {
this._tableAgenda = tableAgenda;
this._tableInfo = tableInfo;
this._numTalleres = 0;

this._talleres= [];
this._participante = [];

//localStorage.removeItem("Talleres");
this._initTables();
}

_initTables() {
let lsTalleres = JSON.parse(localStorage.getItem("Talleres"));
if (lsTalleres === null) {
    return;
}
lsTalleres.forEach((e, index) => {
    e.fechaInicio = new Date(e.fechaInicio);
    e.fechaFin = new Date(e.fechaFin);

    this._addToTable(new Courses(e));
});
}
//Cambiar la información de los campos, y los botenes de guardar y de cancelar
/*_editRow(row,employee){
//Nombre
let iName = document.createElement("input");
iName.type= "text";
iName.value= employee.name;
row.cells[0].innerHTML= "";
row.cells[0].appendChild(iName);
//email
let iEmail = document.createElement("input");
iEmail.type="email";
iEmail.value= employee.email;
row.cells[1].innerHTML="";
row.cells[1].appendChild(iEmail);
//Cumpleaños
let iBirthday = document.createElement("input");
iBirthday.type="date";
iBirthday.value= employee.getBirthdayForDate();
row.cells[2].innerHTML="";
row.cells[2].appendChild(iBirthday);
//crear boton de salvar
let btnSave= document.createElement("input");
btnSave.type = "button";
btnSave.value = "Grabar";
btnSave.className= "btn btn-success"
row.cells[4].innerHTML="";
row.cells[4].appendChild(btnSave);

//evento de guardar
btnSave.addEventListener("click",()=>{
    let newEmployee = {
    name = iName.value,
    email = iEmail.value,
    birthday = iBirthday.value
    };
    this._saveEdit(row, employee, newEmployee);
})

//crear boton de cancelar
let btnCancel= document.createElement("input");
btnCancel.type = "button";
btnCancel.value = "Cancelar";
btnCancel.className= "btn btn-danger"
row.cells[5].innerHTML="";
row.cells[5].appendChild(btnCancel);
//evento de cancelar
btnCancel.addEventListener("click", () =>{
    this._cancelEdit(row, employee);
})
}*/
_ingresarParticipante(){
 let agregar = new Array (this._participante)
 
}   

_addEditDeleteToRow(row, courses){
let btnEdit = document.createElement("input");
btnEdit.type = "button";
btnEdit.value = "Editar";
btnEdit.className = "btn btn-success";
//llamar a un metodo 
/*btnEdit.addEventListener("click", ()=>{
    this._editRow(row, courses);
})*/

let btnDelete = document.createElement("input");
btnDelete.type = "button";
btnDelete.value = "Eliminar";
btnDelete.className = "btn btn-danger";

let btnInPerson = document.createElement("input");
btnInPerson.type = "button";
btnInPerson.value = "Ingresar Part.";
btnInPerson.className = "btn btn-warning";
btnInPerson.addEventListener("click", ()=>{ 
    localStorage.setItem("taller", row.cells[0].innerHTML);


    window.location.href='RegistroP/RegistroParticipantes.html';
})

row.cells[6].appendChild(btnEdit);
row.cells[7].appendChild(btnDelete);
row.cells[8].appendChild(btnInPerson);
}

_addToTable(courses) {
let row = this._tableAgenda.insertRow(-1);
//En la tabla grande 
let cellID = row.insertCell(0);
let cellName = row.insertCell(1);
let cellFechaInicio = row.insertCell(2);
let cellfechaFin = row.insertCell(3);
let cellCapacidad = row.insertCell(4);
let cellDuracion= row.insertCell(5);
row.insertCell(6);
row.insertCell(7);
row.insertCell(8);

cellID.innerHTML= courses.ID;
cellName.innerHTML = courses.name;
cellFechaInicio.innerHTML = courses.getFechaInicialAsString();
cellfechaFin.innerHTML = courses.getFechaFinalAsString();
cellCapacidad.innerHTML = courses.capacidad;
cellDuracion.innerHTML = courses.duracion;

//llamar a los botones
this._addEditDeleteToRow(row, courses);

this._numTalleres++; // this._numTalleres = this._numTalleres + 1

this._tableInfo.rows[0].cells[1].innerHTML = this._numTalleres;

let objCourse = {
    ID: courses.ID,
    name: courses.name,
    fechaInicio: courses.fechaInicio,
    fechaFin: courses.fechaFin,
    capacidad: courses.capacidad,
    duracion: courses.duracion
};

this._talleres.push(objCourse);
}

_findID(ID){//encontrar el correo
let found = -1 

this._talleres.forEach((e, index)=>{
    if(e.ID === ID)
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
this._addToTable(courses);
localStorage.setItem("Talleres", JSON.stringify(this._talleres));
}
}