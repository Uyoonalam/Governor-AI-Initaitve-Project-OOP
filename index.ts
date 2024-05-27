#!/usr/bin/env node

import inquirer from "inquirer";

interface Person {
  getName(): string;
  getAge(): number;
  getPersonality(): string;
  introduce(): void;
}

class Student implements Person {
  private name: string;
  private age: number;
  private personality: string;
  private major: string;

  constructor(name: string, age: number, personality: string, major: string) {
    this.name = name;
    this.age = age;
    this.personality = personality;
    this.major = major;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getPersonality(): string {
    return this.personality;
  }

  introduce(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    console.log(`I am an ${this.personality}.`);
    console.log(`studying in class/year in university : ${this.major}.`);
  }
}

async function createPerson(): Promise<Person> {
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
      when: (answers: any) => answers.isStudent,
    },
  ]);

  if (userData.isStudent) {
    return new Student(userData.name, userData.age, userData.personality, userData.major || "Not Applicable");
  } else {
    return new Student(userData.name, userData.age, userData.personality, "Not Applicable");
  }
}

async function main() {
  const person = await createPerson();
  person.introduce();
}

main();
