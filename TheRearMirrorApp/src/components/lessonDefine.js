'use strict';

function Lesson(id, date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance, to_evaluate) {
    this.id = id;
    this.date = date;
    this.scenario1 = scenario1;
    this.scenario2 = scenario2;
    this.scenario3 = scenario3;
    this.grade = grade;
    this.evaluated = rifEvaluation;
    this.distance = distance;
    this.to_evaluate = to_evaluate;
}

function Route(street, distance) {
    this.street = street;
    this.distance = distance;
}

export { Lesson, Route };