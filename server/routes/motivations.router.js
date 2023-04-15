const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
// GETS this users motivations
router.get('/',rejectUnauthenticated, (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;