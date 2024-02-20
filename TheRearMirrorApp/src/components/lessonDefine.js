'use strict';

function Lesson(date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance, to_evaluate,
    route_1,route_2,route_3,mistake_1,mistake_2,mistake_3) {
    this.date = date;
    this.scenario1 = scenario1;
    this.scenario2 = scenario2;
    this.scenario3 = scenario3;
    this.grade = grade;
    this.evaluated = rifEvaluation;
    this.distance = distance;
    this.to_evaluate = to_evaluate;
    this.route_1=route_1;
    this.route_2=route_2;
    this.route_3=route_3;
    this.mistake_1=mistake_1;
    this.mistake_2=mistake_2;
    this.mistake_3=mistake_3;
}

function Route(street, distance) {
    this.street = street;
    this.distance = distance;
}

export { Lesson, Route };