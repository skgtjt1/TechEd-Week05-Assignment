//seed is used to start up the table in our database

import { db } from "./server.js";

// db.query(`CREATE TABLE IF NOT EXISTS cocktails(
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255),
//     cocktail_name VARCHAR(255),
//     recipe TEXT,
//     rating NUMERIC,
//     difficulty INT,
//     alcoholic BOOLEAN
//     )`);

db.query(`INSERT INTO cocktails (username, cocktail_name, recipe, rating, difficulty, alcoholic)
        VALUES
        ('Justin-Test', 
        'Flaming Moe', 
        '1 ounce brandy, 1 ounce peppermint schnapps, 1 ounce sloe gin, 1 ounce blackberry liqueur, 1 ounce strawberry juice, 1/4 ounce high-proof rum',
         9, 
         6, 
         TRUE)
        
        `);
