'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { Planning} = require('./planning.js');
const { Lesson } = require('./lessonDefine.js');

const db = new sqlite.Database('theRearMirrorDB.db', (err) => {
    if (err) throw err;
});


//TO DO: get latest planning
exports.getLatestPlanning=()=>{
    return new Promise( (resolve,reject)=>{
        const sql = ` SELECT * FROM PLANNINGS ORDER BY creation_date DESC LIMIT 1;`;
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
            const plannings = rows.map((p) => new Planning(p.planning_id, p.creation_date, p.distance));
            resolve(plannings[0]);
        });
    });
};



//SOFT TO DO: WE CAN HARD-CODE IT 
//get latest mistakes



//SOFT TO DO: WE CAN HARD-CODE IT 
//get untested scanrios




//TO DO: INSERT NEW PLANNING



exports.insertPlanning = async(req, res)=>{

    try{
        const {
            distance, 
            recentMistakes,
            untestedScenarios,
        } = req.body;

        const query = `INSERT INTO PLANNINGS(creation_date, distance) VALUES($1, $2)
        RETURNING *;
        `;
        const values=[req.session.clock.time, distance];
        const result = await db.query(query, values);
        if (!result || !result.rows) {
            return res.status(500).json({ msg: "Error inserting the proposal." });
          }
        const newId = result.rows[0].id; //this is the id of the new planning just created 
        
        //insert recent mistakes into plannedscenario
        for (let i = 0; i < recentMistakes.length; i++) {
            const query = `INSERT INTO PLANNEDSCENARIO(planning_id, scenario_name) VALUES($1, $2)
            RETURNING *;
            `;
            const values=[newId, recentMistakes[i]];
            const result = await db.query(query, values);
            if (!result || !result.rows) {
                return res.status(500).json({ msg: "Error inserting the proposal." });
              }
        }

        //insert untested scenarios into plannedscenario
        for (let i = 0; i < untestedScenarios.length; i++) {
            const query = `INSERT INTO PLANNEDSCENARIO(planning_id, scenario_name) VALUES($1, $2)
            RETURNING *;
            `;
            const values=[newId, untestedScenarios[i]];
            const result = await db.query(query, values);
            if (!result || !result.rows) {
                return res.status(500).json({ msg: "Error inserting the proposal." });
              }
        }



        
        
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }


};


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

 



  











