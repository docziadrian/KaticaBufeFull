-- Adatbázis használata
USE katica;

-- =======================================
-- TÁBLA: kategoria (termék kategóriák)
-- =======================================
CREATE TABLE kategoria (
  id INT NOT NULL AUTO_INCREMENT,
  kategoriaNev VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Termékkategóriák táblája';


-- =======================================
-- TÁBLA: vevo (vásárlók / ügyfelek)
-- =======================================
CREATE TABLE vevo (
  id INT NOT NULL AUTO_INCREMENT,
  vevoNev VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Vevők adatai';


-- =======================================
-- TÁBLA: termek (készlet / árucikkek)
-- =======================================
CREATE TABLE termek (
  id INT NOT NULL AUTO_INCREMENT,
  termekNev VARCHAR(100) NOT NULL,
  kategoriaId INT NOT NULL,
  egyseg VARCHAR(10) DEFAULT 'db',
  nettoar DECIMAL(10,2) NOT NULL CHECK (nettoar >= 0),
  mennyiseg INT DEFAULT 0 CHECK (mennyiseg >= 0),
  PRIMARY KEY (id),
  FOREIGN KEY (kategoriaId) REFERENCES kategoria(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Termékek és készletadatok';


-- =======================================
-- TÁBLA: forgalom (rendelések / eladások)
-- =======================================
CREATE TABLE forgalom (
  id INT NOT NULL AUTO_INCREMENT,
  termekId INT NOT NULL,
  vevoId INT NOT NULL,
  kategoriaId INT DEFAULT NULL,
  mennyiseg INT NOT NULL CHECK (mennyiseg > 0),
  nettoar DECIMAL(10,2) NOT NULL CHECK (nettoar >= 0),
  egyseg VARCHAR(10) DEFAULT 'db',
  kiadva BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id),
  FOREIGN KEY (termekId) REFERENCES termek(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (vevoId) REFERENCES vevo(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (kategoriaId) REFERENCES kategoria(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Forgalom, értékesítések, tranzakciók';
