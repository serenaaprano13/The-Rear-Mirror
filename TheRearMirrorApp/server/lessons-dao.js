
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
            const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance,to_evaluate
                 FROM LESSONS WHERE grade<>-1 AND to_evaluate=TRUE ORDER BY lessonDate ASC ;`;
        }
        else
        {

            const sql = ` SELECT lesson_id,rif_evaluation,lessonDate,scenario_1,scenario_2,scenario_3,grade,distance
            FROM LESSONS WHERE  to_evaluate=TRUE ORDER BY lessonDate ASC ;`;
        }
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
            const lessons = rows.map((l) => new Lesson(l.lessonDate,l.scenario_name_1,
                l.scenario_name_2,l.scenario_name_3,l.grade,l.rif_evaluation,l.distance));
            
            resolve(lessons[0]);
        });
    });
};

 



  