//seed is used to start up the table in our database

import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS cocktails(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    cocktail_name VARCHAR(255),
    number_ingredients INT,
    recipe TEXT,
    difficulty INT,
    alcoholic BOOLEAN,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_score INT DEFAULT 0

    )`);

// db.query(`INSERT INTO cocktails (username, cocktail_name, number_ingredients, recipe, difficulty, alcoholic)
//         VALUES (
//         'Emily',
//         'Spritz',
//         4,
//         '1 ounce vodka, lemon wedge, dash of lime, fill rest of glass with soda',
//          2,
//          TRUE,

//          )
//         `);
