
const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { Planning} = require('./planning.js');
const { Lesson } = require('./lessonDefine.js');

const db = new sqlite.Database('theRearMirrorDB.db', (err) => {
    if (err) throw err;
});

//Get Lessons
exports.getLessons=(validated)=>{
    return new Promise( (resolve,reject)=>{
        if(validated)
        {
            const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,grade
                 FROM LESSONS l,EVALUATIONS e WHERE rif_evaluation<>-1 ORDER BY lessonDate ASC ;`;
        }
        else
        {

            const sql = ` SELECT L.lesson_id, L.lessonDate,L.rif_evaluation,
            MAX(CASE WHEN ROWNUM = 1 THEN DS.scenario_name END) AS scenario_name_1,
            MAX(CASE WHEN ROWNUM = 2 THEN DS.scenario_name END) AS scenario_name_2,
            MAX(CASE WHEN ROWNUM = 3 THEN DS.scenario_name END) AS scenario_name_3,
            E.grade
        FROM
            LESSONS L, EVALUATIONS E
        JOIN
            (SELECT
                    LS.rif_lesson,
                    DS.scenario_name,
                    ROW_NUMBER() OVER (PARTITION BY LS.rif_lesson ORDER BY LS.idRow) AS ROWNUM
                FROM
                    LINKLessonScenario LS
                JOIN
                    DRIVINGSCENARIOS DS ON LS.scenario_id = DS.scenario_id
            ) DS ON L.lesson_id = DS.rif_lesson
        GROUP BY
            L.lesson_id, L.lessonDate;`;
        }
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lessonDate,l.scenario_name_1,l.scenario_name_2,l.scenario_name_3,l.grade,l.rif_evaluation,0));
            //date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance)
            resolve(lessons[0]);
        });
    });
};

 



  