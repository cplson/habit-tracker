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
  console.log('req.body:', req.params.id);
  const habitId = req.user.active_habit_id;
  const queryText = `SELECT habit_log.id, date, status, notes 
  FROM habit_log
  JOIN habits ON habit_log.habit_id = habits.id
  WHERE habits.id = $1
  ORDER BY date DESC;`
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
 * POST new log entry
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const habitId = req.body.habit_id,
        date = req.body.date,
        status = req.body.status,
        notes = req.body.notes,
        queryText = `INSERT INTO habit_log (habit_id, date, status, notes)
        VALUES ($1, $2, $3, $4);`;

  pool.query(queryText, [habitId, date, status, notes])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('there was an issue posting new log info to db');
      res.sendStatus(500);
    })
});

/**
 * PUT edit existing log entry
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const logId = req.params.id,
        status = req.body.status,
        notes = req.body.notes,
        userId = req.user.id,
        queryText = `UPDATE habit_log
        SET status = $1,
          notes = $2
        WHERE id = $3;`;
        console.log(logId, status, notes);
  pool.query(queryText, [status, notes, logId])
    .then(result => {
      console.log('updated log entry in server');
      res.sendStatus(200);
    }).catch(err => {
      console.log('There was a problem editing log entry', err);
      res.sendStatus(500);
    })
});


/**
 * DELETE logs for a habit to be deleted
 */
// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//   const habitId = req.params.id,
//         userId = req.user.id;
//         queryText = `DELETE FROM habit_log
//         WHERE habit_id = $1;`;

//   pool.query(queryText, [habitId])
//     .then(result => {
//       res.sendStatus(200);
//     }).catch(err => {
//       console.log('There was an error deleting logs for the habit to be deleted', err);
//       res.sendStatus(500);
//     })
// })

module.exports = router;