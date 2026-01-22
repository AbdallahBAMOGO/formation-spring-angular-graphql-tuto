-- liquibase formatted sql
-- changeset bamos:1

CREATE TABLE product (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         price DOUBLE PRECISION
);