export default class People {
    constructor(people) {
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
get name(){
    return this._name;
}
get cumpleaños(){
    return this._cumpleaños;
}
get email() {
    return this._email;
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
