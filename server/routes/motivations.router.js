const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GETS this users motivations
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('triggered motivations GET');
    const userId = req.user.id;
    const queryText = `SELECT * FROM motivations
    WHERE user_id = $1;`;

    pool.query(queryText, [userId])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('There was an error getting motivations from the db');
            res.sendStatus(500);
        })

});

// POST adds a new motivation to the motivations table
// only if they are logged into the application
router.post('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const motivation = req.body.motivation
    const queryText = `INSERT INTO motivations (user_id, motivation)
    VALUES ($1, $2);`;
    console.log('triggered motivations POST route', userId);
    // POST route code here
    pool.query(queryText, [userId, motivation])
        .then(result => {
            res.sendStatus(201)
        }
        ).catch(err => {
            console.log('there was an error posting motivation to the db', err);
            res.sendStatus(500);
        })
});

module.exports = router;