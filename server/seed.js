//seed is used to start up the table in our database

import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS cocktails(
    id SERIAL PRIMARY KEY,
    Username VARCHAR(255),
    cocktail_name VARCHAR(255),
    recipe TEXT,
    rating NUMERIC,
    difficulty INT,
    alcoholic BOOLEAN
    )`);
