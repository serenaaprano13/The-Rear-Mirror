'use strict' ;

const dayjs = require('dayjs');

function Planning(id, date, distance) {
    this.id = id;
    this.date = dayjs(date);
    this.distance = distance ;
}

function DrivingScenario(name){
    this.name=name;
}



exports.Planning = Planning ;
exports.DrivingScenario = DrivingScenario ;
