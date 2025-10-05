class Student {
  constructor(name, age, major) {
    this.name = name;
    this.age = age;
    this.major = major;
    this.courses = [];
  }

  introduce() {
    console.log(`Imie: ${this.name} Wiek: ${this.age} Kierunek: ${this.major}`);
  }

  enroll(course) {
    this.courses.push(course);
    console.log(`Zapisano na kurs ${course}`);
  }

  displayCourses() {
    this.courses.forEach((e) => {
      console.log(e);
    });
  }

  dropCourse(course) {
    if (this.courses.includes(course)) {
      this.courses.splice(this.courses.indexOf(course), 1);
      console.log(`Zrezygnowano z kursu ${course}`);
    } else {
      console.log(`Nie jesteś zapisany na kurs ${course}`);
    }
  }
}

const student1 = new Student("Jakub", 21, "Informatyka Praktyczna");
student1.enroll("Frontend Development");
student1.displayCourses();
student1.dropCourse("Frontend Development");
student1.displayCourses();
