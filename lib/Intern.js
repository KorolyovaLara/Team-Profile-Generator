//  In addition to Employee's properties and methods, Intern will also have the following:
//  school
//  getSchool()
//  getRole()—overridden to return 'Intern'

const Employee = require("./Employee");

module.exports = class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}