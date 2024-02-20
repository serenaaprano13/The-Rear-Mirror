'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { Lesson, Route } = require('./lessonDefine.js');


const db = new sqlite.Database('theRearMirrorDB.db', (err) => {
    if (err) throw err;
});

//Get Lessons

exports.getLessons = (date) => {
    return new Promise((resolve, reject) => {
        let sql = ` SELECT * FROM LESSONS WHERE 1=1 `;

        if (date) {
            let dateStr = date.toISOString().split('T')[0]; // formatta come piace a sqlite
            if (isDateValid(dateStr)) {
                sql += ` AND lessonDate= ` + dateStr;
            }
        }
        sql += ` ORDER BY lessonDate ASC ;`;
        console.log(sql);
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lesson_id, l.lessonDate, l.scenario_name_1,
                l.scenario_name_2, l.scenario_name_3, l.grade, l.rif_evaluation, l.distance));

            resolve(lessons);
        });
    });
};

exports.getLessonsToEvaluate = (validated) => {
    return new Promise((resolve, reject) => {
        if (validated) {
            const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance,to_evaluate
            FROM LESSONS WHERE grade<>-1 AND to_evaluate=true`;
        }
        else {

            const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance
            FROM LESSONS WHERE  to_evaluate=true `;
        }
        // dateStr = date.toISOString().split('T')[0];//formatta come piace a sqlite
        // if (isDateValid(date)) {
        //     sql += `AND lessonDate= ` + date;
        // }
        sql += `ORDER BY lessonDate ASC ;`;
        console.log(sql);
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lesson_id, l.lessonDate, l.scenario_name_1,
                l.scenario_name_2, l.scenario_name_3, l.grade, l.rif_evaluation, l.distance));

            resolve(lessons);
        });
    });
};


exports.getLessons = (date) => {
    return new Promise((resolve, reject) => {
        let sql = ` SELECT rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance,to_evaluate,
        route_1,route_2,route_3,mistake_1,mistake_2,mistake_3
        FROM LESSONS WHERE 1=1 `;

        if (date) {
            let dateStr = date.toISOString().split('T')[0]; // formatta come piace a sqlite
            if (isDateValid(dateStr)) {
                sql += ` AND lessonDate= ` + dateStr;
            }
        }
        sql += ` ORDER BY lessonDate ASC ;`;
        console.log(sql);

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lessonDate, l.scenario_1, l.scenario_2,
                l.scenario_3, l.grade, l.rif_evaluation, l.distance, l.to_evaluate,
                l.route_1, l.route_2, l.route_3, l.mistake_1, l.mistake_2, l.mistake_3));

            resolve(lessons);
        });
    });
};


exports.updateLesson = (requestBody) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE LESSONS SET to_evaluate = 1 WHERE lessonDate = ?';

        db.run(sql, [requestBody.date], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve("lesson successfully updated");
        });
    });
};




exports.insertEvaluation = (requestBody) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE LESSONS SET grade=? WHERE lessonDate = ?';
        console.log(sql)
        db.run(sql, [requestBody.grade, requestBody.date], function (err) {
            console.log("SENT "+sql)
            if (err) {
                reject(err);
                return;
            }
            resolve("lesson successfully updated");
        });
    });
};


//DA MODIFICARE
exports.insertLesson = async (formData) => {

    const distance = formData.distance;
    console.log("ciao " + distance);
    const { selectedOptions } = formData;
    const selectedOptionNames = selectedOptions.map(option => option.name);
    console.log("ciao2 " + selectedOptionNames);

    db.run('INSERT INTO LESSONS (distance) VALUES (?)', [distance], function (err) {
        if (err) {
            console.error(err);
            return;
        }
        const newId = this.lastID;
        console.log('New planning id: ' + newId);
        selectedOptionNames.forEach(optionName => {
            db.run('INSERT INTO PLANNEDSCENARIO (planning_id, scenario_name) VALUES (?, ?)', [newId, optionName], function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('New planned scenario id: ' + this.lastID);
            });
        });
    });
}
