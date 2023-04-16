const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET user habit list
 */
router.get('/', (req, res) => {
  // GET route code here
  const userId = req.user.id;
  const queryText = `SELECT * FROM habits
  WHERE user_id = $1;`

  pool.query(queryText, [userId])
    .then(result => {
        console.log('got the habits list from the db');
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