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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;