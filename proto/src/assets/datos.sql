CREATE TABLE IF NOT EXISTS SCANEO(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    datos TEXT,
    fecha TEXT

);

INSERT OR IGNORE INTO SCANEO(id,datos,fecha) values(1, 'https://www.scanqr.cl/clase/1', '1 diciembre 2022');
INSERT OR IGNORE INTO SCANEO(id,datos,fecha) values(2, 'https://www.scanqr.cl/clase/2', '2 diciembre 2022');
INSERT OR IGNORE INTO SCANEO(id,datos,fecha) values(3, 'https://www.scanqr.cl/clase/3', '3 diciembre 2022');