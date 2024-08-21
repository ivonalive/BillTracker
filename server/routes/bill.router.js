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
});

// PUT route

router.put('/:id', (req, res) => {
  // code here
    let idUpdate = req.params.id;

    let updatedBill = req.body;
    let name = updatedBill.bill_name;
    let amount = updatedBill.bill_amount;
    let link = updatedBill.bill_link;
    let card = updatedBill.card_nicname;
    let due_date = updatedBill.bill_due_date;
    
  const sqlText = `
            UPDATE "bill_information" 
            SET "name" = $1, "amount" = $2, "link" = $3 , "card" = $4, "due_date"= $5
            WHERE "id" = $5;
    `;

  pool.query(queryText, [name, amount, link, card, due_date, idUpdate])
  .then((result) => {
      console.log(`Got stuff back from the database`, result);
      res.sendStatus(201);
  })
  .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); 
  })
});

module.exports = router;
