import People from "./PartiR.js";
/*if (!x){
    x=0
}*/
export default class RegisterP {
constructor(tableAgenda, tableInfo) {
this._tableAgenda = tableAgenda;
this._tableInfo = tableInfo;
this._numPersonas = 0;

this._participantes= [];

this._initTables();
//localStorage.removeItem("parti");
}

_initTables() {
this._tableAgenda.innerHTML= "";
let lsPeople = JSON.parse(localStorage.getItem("parti"));
console.log(lsPeople);
if (lsPeople === null) {
    return;
}
lsPeople.forEach((e, index) => { 
    e.cumpleaños = new Date(e.cumpleaños);
    this._addToTable(new People(e));
});
}
_delete(row,people){
    for(let i = 0; i < this._participantes.length;i++){
        if (people.email === this._participantes[i].email){
            this._participantes.splice(i,1);
    break}
    }
    console.log(this._participantes);
    row.innerHTML= "";
    localStorage.setItem("parti", JSON.stringify(this._participantes));
}
_cancelEdit(row, people){  
    row.cells[0].innerHTML = people.name;
    row.cells[1].innerHTML= people.email;
    row.cells[2].innerHTML= people.getAgeAsString();
    row.cells[3].innerHTML = "";
    row.cells[4].innerHTML = "";
    this._addEditDeleteToRow(row, people);
    }
//metodo para guardar
_saveEdit(row, people, newParticipante){
    //Buscar su ubicación 
    let pos = this._findID(people.id);
    this._participantes[pos] = newParticipante;
    localStorage.setItem("parti", JSON.stringify(this._participantes));
    
    this._cancelEdit(row, new People(newParticipante));
    }
//Cambiar la información de los campos, y los botenes de guardar y de cancelar
_editRow(row,people){
//Nombre
let iName = document.createElement("input");
iName.type= "text";
iName.value= people.name;
row.cells[0].innerHTML= "";
row.cells[0].appendChild(iName);
//email
let iEmail = document.createElement("input");
iEmail.type="email";
iEmail.value= people.email;
row.cells[1].innerHTML="";
row.cells[1].appendChild(iEmail);
//Cumpleaños
let iBirthday = document.createElement("input");
iBirthday.type="date";
iBirthday.value= people.getCumpleForDate();
row.cells[2].innerHTML="";
row.cells[2].appendChild(iBirthday);
//crear boton de salvar
let btnSave= document.createElement("input");
btnSave.type = "button";
btnSave.value = "Grabar";
btnSave.className= "btn btn-success"
row.cells[3].innerHTML="";
row.cells[3].appendChild(btnSave);

//evento de guardar
btnSave.addEventListener("click",()=>{
    let newParticipante = {
    name : iName.value,
    email : iEmail.value,
    cumpleaños : iBirthday.value
    };
    this._saveEdit(row, people, newParticipante);
})

//crear boton de cancelar
let btnCancel= document.createElement("input");
btnCancel.type = "button";
btnCancel.value = "Cancelar";
btnCancel.className= "btn btn-danger"
row.cells[4].innerHTML="";
row.cells[4].appendChild(btnCancel);
//evento de cancelar
btnCancel.addEventListener("click", () =>{
    this._cancelEdit(row, people);
})
}

_addEditDeleteToRow(row, people){
let btnEdit = document.createElement("input");
btnEdit.type = "button";
btnEdit.value = "Editar";
btnEdit.className = "btn btn-success";
//llamar a un metodo 
btnEdit.addEventListener("click", ()=>{
    this._editRow(row, people);
})

let btnDelete = document.createElement("input");
btnDelete.type = "button";
btnDelete.value = "Eliminar";
btnDelete.className = "btn btn-danger";
btnDelete.addEventListener("click",()=>{
    this._delete(row,people);
})

row.cells[3].appendChild(btnEdit);
row.cells[4].appendChild(btnDelete);
}

_addToTable(people) {
let idTaller = localStorage.getItem("idTaller");
console.log(localStorage.getItem("idTaller"));
if(people.id === idTaller){

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
this._numPersonas++; // this._numPersonas = this._numPersonas + 1
let Num =(localStorage.setItem("numPersonas", this._numPersonas.value));
if(!Num){
    Num = this._numPersonas;
}
console.log(Num);
//llamar a los botones
this._addEditDeleteToRow(row, people);
}
console.log(this._participantes);



this._tableInfo.rows[0].cells[1].innerHTML = this._numPersonas;

let objPersonas = {
    id : people.id,
    name: people.name,
    cumpleaños: people.cumpleaños,
    email: people.email
};

this._participantes.push(objPersonas);
}
//return;}


_findID(id){//encontrar el correo
let found = -1 

this._participantes.forEach((e, index)=>{
    if(e.id === id)
    {
    found = index;
    return;
    }
});
return found;
}

addPeople(people) {
let found = this._findID(people.id);
if (found >= 0){
    swal.fire({
    type: "error",
    title: "error",
    text: "El Participante ya esta registrado"
    });
    return;
}
let capacity = localStorage.getItem("capacity");
let idTaller = localStorage.getItem("idTaller");
people.id = idTaller;
this._addToTable(people);
localStorage.setItem("parti", JSON.stringify(this._participantes));
}
}