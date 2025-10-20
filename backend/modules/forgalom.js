const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

// Get all forgalom
router.get("/", (req, res) => {
  const sql = `
    SELECT f.*, t.termekNev, v.vevoNev, k.kategoriaNev
    FROM forgalom f
    JOIN termek t ON t.id = f.termekId
    JOIN vevo v ON v.id = f.vevoId
    LEFT JOIN kategoria k ON k.id = f.kategoriaId
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).send(results);
  });
});

// Get ONE forgalom by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  const sql = `
    SELECT f.*, t.termekNev, v.vevoNev, k.kategoriaNev
    FROM forgalom f
    JOIN termek t ON t.id = f.termekId
    JOIN vevo v ON v.id = f.vevoId
    LEFT JOIN kategoria k ON k.id = f.kategoriaId
    WHERE f.id = ?
  `;
  pool.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// POST new forgalom
router.post("/", (req, res) => {
  const data = req.body;
  const {
    termekId,
    vevoId,
    kategoriaId = null,
    egyseg = "db",
    nettoar,
    mennyiseg,
    kiadva = false,
  } = data;

  if (
    termekId == null ||
    vevoId == null ||
    nettoar == null ||
    mennyiseg == null
  ) {
    return res.status(400).json({
      error: "Hiányzó kötelező adatok (termekId, vevoId, nettoar, mennyiseg).",
    });
  }

  pool.query(
    `INSERT INTO forgalom (termekId, vevoId, kategoriaId, egyseg, nettoar, mennyiseg, kiadva) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [termekId, vevoId, kategoriaId, egyseg, nettoar, mennyiseg, kiadva],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// UPDATE forgalom BY ID
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { termekId, vevoId, kategoriaId, egyseg, nettoar, mennyiseg, kiadva } =
    data;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  // Partial update support
  const fields = [];
  const values = [];

  if (termekId != null) {
    fields.push("termekId = ?");
    values.push(termekId);
  }
  if (vevoId != null) {
    fields.push("vevoId = ?");
    values.push(vevoId);
  }
  if (kategoriaId !== undefined) {
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
  if (kiadva != null) {
    fields.push("kiadva = ?");
    values.push(kiadva);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nincs frissítendő mező." });
  }

  const sql = `UPDATE forgalom SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  pool.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// DELETE forgalom BY ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`DELETE FROM forgalom WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;
