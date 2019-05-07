import People from "./PartiR.js";

export default class RegisterP {
constructor(tableAgenda, tableInfo) {
this._tableAgenda = tableAgenda;
this._tableInfo = tableInfo;
this._numPersonas = 0;

this._participantes= [];

//localStorage.removeItem("Participantes");
this._initTables();
}

_initTables() {
let lsPeople = JSON.parse(localStorage.getItem("Participantes"));
if (lsPeople === null) {
    return;
}
lsPeople.forEach((e, index) => {
    e.cumpleaños = new Date(e.cumpleaños);
    this._addToTable(new People(e));
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

_addEditDeleteToRow(row, people){
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

row.cells[3].appendChild(btnEdit);
row.cells[4].appendChild(btnDelete);
}

_addToTable(people) {
let row = this._tableAgenda.insertRow(-1);
//En la tabla grande 
let cellName = row.insertCell(0);
let cellEmail= row.insertCell(1);
let cellCumpleaños = row.insertCell(2);
row.insertCell(3);
row.insertCell(4);

cellName.innerHTML = people.name;
cellEmail.innerHTML = people.email;
cellCumpleaños.innerHTML = people.getAgeAsString();

//llamar a los botones
this._addEditDeleteToRow(row, people);

this._numPersonas++; // this._numPersonas = this._numPersonas + 1

this._tableInfo.rows[0].cells[1].innerHTML = this._numPersonas;

let objPersonas = {
    name: people.name,
    cumpleaños: people.cumpleaños,
    email: people.email
};

this._participantes.push(objPersonas);
}

_findEmail(email){//encontrar el correo
let found = -1 

this._participantes.forEach((e, index)=>{
    if(e.email === email)
    {
    found = index;
    return;
    }
});
return found;
}

addPeople(people) {
let found = this._findEmail(people.email);
if (found >= 0){
    swal.fire({
    type: "error",
    title: "error",
    text: "El Participante ya esta registrado"
    });
    return;
}
this._addToTable(people);
localStorage.setItem("Participantes", JSON.stringify(this._participantes));
}
}