const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

// Get all products (termek)
router.get("/", (req, res) => {
  const sql = `
    SELECT t.*, k.kategoriaNev
    FROM termek t
    JOIN kategoria k ON k.id = t.kategoriaId
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Get one product by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  const sql = `
    SELECT t.*, k.kategoriaNev
    FROM termek t
    JOIN kategoria k ON k.id = t.kategoriaId
    WHERE t.id = ?
  `;
  pool.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Create product
router.post("/", (req, res) => {
  const data = req.body;
  const {
    termekNev,
    kategoriaId,
    egyseg = "db",
    nettoar,
    mennyiseg = 0,
  } = data;

  if (!termekNev || !kategoriaId || nettoar == null) {
    return res.status(400).json({
      error:
        "Nem adott meg minden kötelező adatot (termekNev, kategoriaId, nettoar).",
    });
  }

  pool.query(
    `INSERT INTO termek (termekNev, kategoriaId, egyseg, nettoar, mennyiseg) VALUES (?, ?, ?, ?, ?)`,
    [termekNev, kategoriaId, egyseg, nettoar, mennyiseg],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// Update product by ID
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { termekNev, kategoriaId, egyseg, nettoar, mennyiseg } = data;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  // Build dynamic update to allow partial updates
  const fields = [];
  const values = [];

  if (termekNev != null) {
    fields.push("termekNev = ?");
    values.push(termekNev);
  }
  if (kategoriaId != null) {
    fields.push("kategoriaId = ?");
    values.push(kategoriaId);
  }
  if (egyseg != null) {
    fields.push("egyseg = ?");
    values.push(egyseg);
  }
  if (nettoar != null) {
    fields.push("nettoar = ?");
    values.push(nettoar);
  }
  if (mennyiseg != null) {
    fields.push("mennyiseg = ?");
    values.push(mennyiseg);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nincs frissítendő mező." });
  }

  const sql = `UPDATE termek SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  pool.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Delete product by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`DELETE FROM termek WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;
