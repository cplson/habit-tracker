const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET user habit list
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const userId = req.user.id;
  const queryText = `SELECT * FROM habits
  WHERE user_id = $1;`

  pool.query(queryText, [userId])
    .then(result => {
        console.log('got the habits list from the db', result.rows);
        res.send(result.rows);
    }).catch(err => {
        console.log('error retrieving habits from db', err);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const userId = req.user.id,
        description = req.body.description,
        queryText = `INSERT INTO habits (user_id, description)
        VALUES ($1, $2);`;

  pool.query(queryText, [userId, description])
    .then(result => {
      console.log('posted habit to db');
      res.sendStatus(201);
    }).catch(err => {
      console.log('There was an issue posting new habit to the db', err);
      res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const habitId = req.params.id,
        userId = req.user.id,
        queryText = `DELETE FROM habits
        WHERE id=$1 AND user_id = $2;`

  pool.query(queryText, [habitId, userId])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('there was an error deleting habit from db', err);
      res.sendStatus(500);
    })
})

module.exports = router;