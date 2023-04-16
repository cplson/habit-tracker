const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET habit log
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const habitId = req.body.habitId;
  const queryText = `SELECT * FROM habit_log
  JOIN habits ON habit_log.habit_id = habits.id
  WHERE habits.id = $1;`

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