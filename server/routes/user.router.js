const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // const firstMotivation = req.body.firstMotivation;
  // const firstBlessing = req.body.firstBlessing;
  const userQuery = `INSERT INTO "user" (username, password, email, first_name, last_name)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  // const motoQuery = `INSERT INTO "motivations" (user_id, motivation)
  //   VALUES ($1, $2);`;
  // const blessingQuery = `INSERT INTO "blessings" (user_id, blessing)
  //   VALUES ($1, $2);`;
  pool.query(userQuery, [username, password, email, firstName, lastName])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('User registration failed on motivation', err);
      res.sendStatus(500);
    })

  .catch((err) => {
    console.log('User registration failed on user info: ', err);
    res.sendStatus(500);
  });
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id,
        activeHabitId = req.params.id,
        queryText = `UPDATE "user"
        SET active_habit_id = $2
        WHERE "user".id = $1;`;

  pool.query(queryText, [userId, activeHabitId])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err => {
        console.log('there was an issue updating active habit id', err);
        res.sendStatus(500);
      })
    })
})

module.exports = router;
