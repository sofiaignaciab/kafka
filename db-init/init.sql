-- CREATE USER myuser WITH PASSWORD 'mypassword';
-- CREATE DATABASE mydb OWNER myuser;

DROP TABLE IF EXISTS compras;

CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    itemname VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    estado VARCHAR(255) NOT NULL
);

COPY compras (itemname, price, estado, id)
FROM '/docker-entrypoint-initdb.d/dataset.csv'
DELIMITER ','
CSV HEADER;

DROP TABLE IF EXISTS solicitud;
CREATE TABLE solicitud (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NOT NULL,
    itemId INT NOT NULL,
    estado VARCHAR(255) NOT NULL
);