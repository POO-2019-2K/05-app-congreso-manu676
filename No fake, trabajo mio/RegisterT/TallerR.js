export default class Courses {
    constructor(courses) {
    this._ID = courses.ID;
    this._name = courses.name.toUpperCase();
    this._fechaInicio = new Date (courses.fechaInicio);
    this._fechaFin = new Date(courses.fechaFin);
    this._capacidad = courses.capacidad;
    this._duracion= courses.duracion;
    this._months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ];
}
get ID(){
    return this._ID
}

get name() {
    return this._name;
}

get fechaInicio() {
    return this._fechaInicio;
}

get fechaFin() {
    return this._fechaFin;
}
get capacidad() {
    return this._capacidad;
}
get duracion() {
    return this._duracion;
}

_getNumberAs2Digits(number){
    if (number < 10){
    //se convierte en string
    return "0"+number;
    } 
    return number;
}

getFechaInicioForDate(){
    //descomposicion
    let {fechaInicio} = this;
    let date = fechaInicio.getFullYear() + "-" + 
    this._getNumberAs2Digits(fechaInicio.getMonth()+1) + "-" +
    this._getNumberAs2Digits(fechaInicio.getDate());
    return date;
}
getFechaFinForDate(){
    //descomposicion
    let {fechaFin} = this;
    let date = fechaFin.getFullYear() + "-" + 
    this._getNumberAs2Digits(fechaFin.getMonth()+1) + "-" +
    this._getNumberAs2Digits(fechaFin.getDate());
    return date;
}
getFechaInicialAsString() {
    let date =
    this._fechaInicio.getDate() +
    "/" +
    this._months[this._fechaInicio.getMonth()] +
    "/" +
    this._fechaInicio.getFullYear();

    return date;
}
getFechaFinalAsString() {
    let date =
    this._fechaFin.getDate() +
    "/" +
    this._months[this._fechaFin.getMonth()] +
    "/" +
    this._fechaFin.getFullYear();

    return date;
}
}
