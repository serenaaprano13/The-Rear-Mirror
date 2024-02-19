'use strict' ;

// LESSONS(lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance,to_evaluate)
function Lesson(date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance, to_evaluate) {
    this.date = date;
    this.scenario1 = scenario1;
    this.scenario2 = scenario2;
    this.scenario3 = scenario3;
    this.grade = grade;
    this.evaluated = rifEvaluation;
    this.distance = distance;
    this.to_evaluate = to_evaluate;
}

//ROUTES(route_id,rif_lesson,routeName,distanceInKm)
function Route(street, distance) {
    this.street = street;
    this.distance = distance;
}

//EVALUATION(idRow,rif_lesson,grade,evaluationDate)


module.exports =  { Lesson, Route };