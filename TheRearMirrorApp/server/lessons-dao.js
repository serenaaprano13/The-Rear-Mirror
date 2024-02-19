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

exports.getLessonByID = (id) => {
    return new Promise((resolve, reject) => {

        const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance
            FROM LESSONS WHERE  lesson_id= `+ id;
        console.log(sql);
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lesson_id, l.lessonDate, l.scenario_name_1,
                l.scenario_name_2, l.scenario_name_3, l.grade, l.rif_evaluation, l.distance));

            resolve(lessons[0]);
        });
    });
};


exports.getRouteByLesson = (lesson_id) => {
    return new Promise((resolve, reject) => {

        const sql = ` SELECT route_id,rif_lesson,routeName,distanceInKm
            FROM ROUTES WHERE  rif_lesson_= `+ lesson_id;
        console.log(sql);
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const routes= rows.map((r) => new Route(r.route_id, r.rif_lesson, r.routeName, r.distanceInKm));

            resolve(routes[0]);
        });
    });
};


exports.insertEvaluation = async(lesson_id,grade) => {

    // const grade = formData.grade;
    // const lesson_id = formData.lesson_id;
    console.log("update eval grade" + grade + "  id" +lesson_id );

    db.run("INSERT INTO EVALUATION(rif_lesson,grade,evaluationDate) VALUES (?,DATE('now'))", [lesson_id,grade], function(err)  {
        if (err) {
            console.error(err);
            return;
        }
        
    });
    
    db.run("UPDATE LESSON SET grade=? WHERE lesson_id=? ", [grade,lesson_id], function(err)  {
        if (err) {
            console.error(err);
            return;
        }
        
    });
}


