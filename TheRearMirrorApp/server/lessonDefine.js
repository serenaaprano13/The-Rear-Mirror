

function Lesson(date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance) {
    this.date = date;
    this.scenario1 = scenario1;
    this.scenario2 = scenario2;
    this.scenario3 = scenario3;
    this.grade = grade;
    this.evaluated = rifEvaluation;
    this.distance = distance;
}

function Route(street,distance)
{
    this.street=street;
    this.distance=distance;
}
export { Lesson ,Route};