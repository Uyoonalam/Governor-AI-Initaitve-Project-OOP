import inquirer from "inquirer";
class Student {
    name;
    age;
    personality;
    major;
    constructor(name, age, personality, major) {
        this.name = name;
        this.age = age;
        this.personality = personality;
        this.major = major;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getPersonality() {
        return this.personality;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        console.log(`I am an ${this.personality}.`);
        console.log(`I am a studying in class/year in university ${this.major}.`);
    }
}
async function createPerson() {
    const userData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "number",
            name: "age",
            message: "How old are you?",
        },
        {
            type: "list",
            name: "personality",
            message: "What is your personality type?",
            choices: ["Extrovert", "Introvert"],
        },
        {
            type: "confirm",
            name: "isStudent",
            message: "Are you a student?",
        },
        {
            type: "input",
            name: "major",
            message: "What is your major?",
            when: (answers) => answers.isStudent,
        },
    ]);
    if (userData.isStudent) {
        return new Student(userData.name, userData.age, userData.personality, userData.major || "Undeclared");
    }
    else {
        return new Student(userData.name, userData.age, userData.personality, "Undeclared");
    }
}
async function main() {
    const person = await createPerson();
    person.introduce();
}
main();
