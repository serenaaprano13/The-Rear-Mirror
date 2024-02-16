'use strict' ;

const dayjs = require('dayjs');

function Planning(id, date, distance) {
    this.id = id;
    this.date = dayjs(date);
    this.distance = distance ;
}



exports.Planning = Planning ;
