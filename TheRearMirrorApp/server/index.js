/*chatgpt code
const express = require('express');
const app = express();
const port = 3000;

// Import your data access object
const dao = require('./your-dao-file');

// Define an API endpoint to get the most recently created planning
app.get('/api/latestPlanning', async (req, res) => {
    try {
        const latestPlanning = await dao.getLatestPlanning();
        res.json(latestPlanning);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/










'use strict';

const PORT = 3000 ;

const express = require('express');
//const morgan = require('morgan');
const PlanningDAO = require('./plannings-dao.js');
const { Planning } = require('./planning.js');

const app = express();
//app.use(morgan('combined'));
app.use(express.json());


app.get('/api/latestPlanning', (req, res) => {
    PlanningDAO.getLatestPlanning().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    })
})





app.listen(PORT, 
    () => { console.log(`Server started on http://localhost:${PORT}/`) });