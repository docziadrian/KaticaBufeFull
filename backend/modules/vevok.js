const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

// Get all vevok
router.get("/", (req, res) => {
  pool.query("SELECT * FROM vevo", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Get one vevo by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`SELECT * FROM vevo WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Create vevo
router.post("/", (req, res) => {
  const data = req.body;
  const { vevoNev } = data;

  if (!vevoNev) {
    return res.status(400).json({ error: "Nem adott meg vevo nevet." });
  }

  pool.query(
    `INSERT INTO vevo (vevoNev) VALUES (?)`,
    [vevoNev],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// Update vevo by ID
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { vevoNev } = data;

  if (!id || !vevoNev) {
    return res
      .status(400)
      .json({ error: "Nem adott meg id-t vagy vevo nevet." });
  }

  pool.query(
    `UPDATE vevo SET vevoNev = ? WHERE id = ?`,
    [vevoNev, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// Delete vevo by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`DELETE FROM vevo WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;
