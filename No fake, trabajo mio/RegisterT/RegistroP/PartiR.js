export default class People {
    constructor(people) {
    this._id =people.id;
    this._name = people.name.toUpperCase();
    this._cumpleaños = new Date (people.cumpleaños);
    this._email= people.email;
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
get id(){
    return this._id;
}
set id(idTaller){
    this._id = idTaller;
}
get name(){
    return this._name;
}
get cumpleaños(){
    return this._cumpleaños;
}
get email() {
    return this._email;
}
_getNumberAs2Digits(number){
    if (number < 10){
    //se convierte en string
    return "0"+number;
    } 
    return number;
}

getCumpleForDate(){
    //descomposicion
    let {cumpleaños} = this;
    let date = cumpleaños.getFullYear() + "-" + 
    this._getNumberAs2Digits(cumpleaños.getMonth()+1) + "-" +
    this._getNumberAs2Digits(cumpleaños.getDate());
    return date;
}

getAgeAsString() {
    let date =
    this._cumpleaños.getDate() +
    "/" +
    this._months[this._cumpleaños.getMonth()] +
    "/" +
    this._cumpleaños.getFullYear();

    return date;
}
}
