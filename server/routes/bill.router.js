const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET bills
 */
router.get('/', (req, res) => {
  console.log("GET /api/bill has been invoked");
  const sqlText = `
    SELECT * FROM "bill_information"
      ORDER BY "bill_due_date";
  `;
  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('error getting bills', dbErr);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('req.body', req.body)

  const { bill_name, bill_amount, bill_link, card_nickname, bill_due_date } = req.body;

    let sqlQuery = `INSERT INTO "bill_information" ("bill_name", "bill_amount", "bill_link", "card_nickname", "bill_due_date")
    VALUES ($1, $2, $3, $4, $5);`

    const queryValues = [bill_name, bill_amount, bill_link, card_nickname, bill_due_date];

    pool.query(sqlQuery, queryValues)
    .then(dbResult => {
        console.log('dbResult.rows insterted', dbResult.rows);
        res.sendStatus(200);
    })
    .catch(dbError => {
        console.log('POST - dbError:', dbError);
        res.sendStatus(500);
    })
});

// PUT route

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount, link, card, due_date } = req.body;

  const sqlQuery = `
    UPDATE "bill_information"
    SET "bill_name" = $1, "bill_amount" = $2, "bill_link" = $3, "card_nickname" = $4, "bill_due_date" = $5
    WHERE "id" = $6;
  `;

  const queryValues = [name, amount, link, card, due_date, id];

  pool
    .query(sqlQuery, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('PUT - Error executing query', error);
      res.sendStatus(500);
    });
});


//  DELETE route
router.delete('/:id', (req, res) => {
  console.log('req.params', req.params);

  let idToDelete = req.params.id

  console.log('idToDelete', idToDelete);

  console.log('typeof idToDelete', typeof idToDelete);

  // write a SQL query
  let queryText = `DELETE FROM "bill_information" WHERE id = $1;`;

  // send it to the database
  pool.query(queryText, [idToDelete])
      .then(dbResult => {
          // unpack the results
          console.log(dbResult);
          // send the client a response, based on the results.
          res.sendStatus(200);
      })
      .catch(dbError => {
          console.log(dbError);
          res.sendStatus(500);
      })
});

module.exports = router;
