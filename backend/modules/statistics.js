/*
{
    "usersCount": 16,
    "productsCount": 3,
    "salesSum": 30,
    "pariceSum": 71600,
    "products": [
        "Lángos": {
            "count": 12,
            "price": 25000
        },
        "Hot-dog": {
            "count": 8,
            "price": 12600    
        },
        "Hamburger": {         
            "count": 10,
            "price": 34000
        }
    ]
}
*/

const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  const summaryQuery = `
      SELECT 
        COUNT(DISTINCT vevoId) AS osszesVasarlo, 
        COUNT(DISTINCT termekId) AS osszesTermek, 
        SUM(mennyiseg) AS vegosszeg, 
        SUM(mennyiseg * nettoar) AS priceSum
      FROM forgalom;
    `;

  const productQuery = `
      SELECT 
        termekId, 
        SUM(mennyiseg) AS count, 
        SUM(mennyiseg * nettoar) AS price
      FROM forgalom
      GROUP BY termekId;
    `;

  pool.query(summaryQuery, (err, summaryResult) => {
    if (err) return res.status(500).json({ error: err.message });

    pool.query(productQuery, (err2, productResults) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const stats = {
        osszesVasarlo: summaryResult[0].osszesVasarlo,
        osszesTermek: summaryResult[0].osszesTermek,
        vegosszeg2: summaryResult[0].vegosszeg,
        vegosszeg: summaryResult[0].priceSum,
        products: productResults.map((row) => ({
          product: row.termek,
          count: row.count,
          price: row.price,
        })),
      };

      res.json(stats);
    });
  });
});

module.exports = router;
