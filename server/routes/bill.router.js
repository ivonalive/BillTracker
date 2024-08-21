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

module.exports = router;
