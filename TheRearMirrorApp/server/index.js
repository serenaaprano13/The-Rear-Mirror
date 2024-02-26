'use strict';

const PORT = 3000 ;

const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const PlanningDAO = require('./plannings-dao.js');
const { Planning } = require('./planning.js');

const LessonDAO = require('./lessonDAO.js');
const { Lesson } = require('./lessonDefine.js');

const app = express();
//app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/api/latestPlanning', (req, res) => {
    PlanningDAO.getLatestPlanning().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    })
})


app.post('/api/createPlanning', async (req, res) => {
    try {
        const formData= req.body;
        console.log(formData);
        const result = await PlanningDAO.insertPlanning(formData);
        res.json(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

/*
app.post('/api/questions/:questionId/answers', async (req, res) => {
    const questionId = req.params.questionId;

    const bodyanswer = req.body;
    const answer = new Answer(undefined, bodyanswer.text, bodyanswer.author, undefined, bodyanswer.date, questionId);

    try {
        let id = await dao.createAnswer(questionId, answer);
        console.log(id);
        res.send(String(id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});
*/

app.get('/api/getLessonsToEvaluate', (req, res) => {
    LessonDAO.getLessonsToEvaluate().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    })
})

app.get('/api/getLessons', (req, res) => {
    LessonDAO.getLessons().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    })
})


app.put('/api/updateLesson', async (req, res) => {
    await LessonDAO.updateLesson(req.body).catch(err => res.status(500).json(err));
})

app.put('/api/insertEval', async (req, res) => {
    await LessonDAO.insertEval(req.body).catch(err => res.status(500).json(err));
})

app.post('/api/saveLesson', async (req, res) => {

   // console.log("Valore ricevuto dalla post:");
   // console.log(req.body);

    await LessonDAO.saveLesson(req.body)
      .catch(err => res.status(500).json(err));
  
    res.json();
  }
  );


 
app.listen(PORT, 
    () => { console.log(`Server started on http://localhost:${PORT}/`) });