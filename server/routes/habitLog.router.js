const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET habit log
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('req.body:', req.params.id);
  const habitId = req.params.id;
  const queryText = `SELECT habit_log.id, status, notes 
  FROM habit_log
  JOIN habits ON habit_log.habit_id = habits.id
  WHERE habits.id = $1;`
  console.log('habitId', habitId);

  pool.query(queryText, [habitId])
    .then(result => {
        console.log('got the habit log from the db', result.rows);
        res.send(result.rows);
    }).catch(err => {
        console.log('error retrieving habit log from db', err);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;