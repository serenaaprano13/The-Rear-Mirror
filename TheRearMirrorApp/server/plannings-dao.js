'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { Planning, DrivingScenario} = require('./planning.js');
const { Lesson } = require('./lessonDefine.js');

const db = new sqlite.Database('theRearMirrorDB.db', (err) => {
    if (err) throw err;
});


//TO DO: get latest planning
exports.getLatestPlanning=()=>{
    return new Promise( (resolve,reject)=>{
        const sql = ` SELECT * FROM PLANNINGS ORDER BY planning_id DESC LIMIT 1;`;
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
        const plannings = rows.map((p) => new Planning(p.planning_id, p.creation_date, p.distance));
        const planning = plannings[0];
        const planningId=planning.id;
        console.log("planning id" + planningId);


        const sql2 = `SELECT * FROM PLANNEDSCENARIO WHERE planning_id = ?;`;
        db.all(sql2, [planningId], (err, rows) => {
            if (err) {
            reject(err);
            return;
            }
            const scenarioNames = rows.map((d) => new DrivingScenario(d.scenario_name));
            
            resolve({ planning, scenarioNames });
            //console.log("rows" + +JSON.stringify(rows));
            /*const scenarioNames = rows.map(row => row.scenario_name);
            console.log("scenario names" + scenarioNames); */
            //resolve({ planning, scenarioNames });
        });
      });

        
    });
};


// delete planning
exports.deletePlanning = (planningId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM PLANNINGS WHERE planning_id = ?';
        db.run(sql, [planningId], function(err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};



//SOFT TO DO: WE CAN HARD-CODE IT 
//get latest mistakes



//SOFT TO DO: WE CAN HARD-CODE IT 
//get untested scanrios




//TO DO: INSERT NEW PLANNING



/*exports.insertPlanning = async(req, res)=>{

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
            return res.status(500).json({ msg: "Error inserting the planning." });
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
                return res.status(500).json({ msg: "Error inserting the planning." });
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


};*/

exports.insertPlanning = async(formData) => {

    const distance = formData.distance;
    console.log("ciao " + distance);
    const { selectedOptions } = formData;
    const selectedOptionNames = selectedOptions.map(option => option.name);
    console.log("ciao2 " + selectedOptionNames);

    db.run('INSERT INTO PLANNINGS (distance) VALUES (?)', [distance], function(err)  {
        if (err) {
            console.error(err);
            return;
        }
        const newId = this.lastID;
        console.log('New planning id: ' + newId);
        selectedOptionNames.forEach(optionName => {
            db.run('INSERT INTO PLANNEDSCENARIO (planning_id, scenario_name) VALUES (?, ?)', [newId, optionName], function(err) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('New planned scenario id: ' + this.lastID);
            });
        });
    });



    
   
/*
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO PLANNING (distance) VALUES (?)';
        db.run(sql, [formData.distance], function(err)  {
            if (err) reject(err)
            
        });
    });
*/
};














