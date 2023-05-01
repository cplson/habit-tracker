const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


// GETS this users motivations
router.get('/',rejectUnauthenticated, (req, res) => {
    // GET route code here
  console.log('triggered blessings GET');
    const userId = req.user.id;
    const queryText = `SELECT * FROM blessings
    WHERE user_id = $1
    ORDER BY blessing DESC;`;

    pool.query(queryText, [userId])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('There was an error getting blessings from the db');
            res.sendStatus(500);
        })
  
});


// POST adds a new motivation to the motivations table
// only if they are logged into the application
router.post('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const blessing = req.body.blessing;
    const queryText = `INSERT INTO blessings (user_id, blessing)
    VALUES ($1, $2);`;
    console.log('triggered blessings POST route', userId, req.body);
    // POST route code here
    pool.query(queryText, [userId, blessing])
        .then(result => {
            res.sendStatus(201)
        }
        ).catch(err => {
            console.log('there was an error posting blessing to the db', err);
            res.sendStatus(500);
        })
});

// PUT 
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const userId = req.user.id,
        blessingId = req.params.id,
        blessing = req.body.blessing,
        queryText = `UPDATE blessings
        SET blessing = $1
        WHERE user_id = $2 AND id = $3;`

        pool.query(queryText, [blessing, userId, blessingId])
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
})

module.exports = router;