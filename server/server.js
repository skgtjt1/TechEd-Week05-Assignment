import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

const dbConnectionString = process.env.DATABASE_URL;

const PORT = 6969;

app.listen(PORT, function () {
  console.log(`The server is up and listening on: ${PORT}`);
});

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/testing", function (req, res) {
  res.json({
    message: "This server is accepting GET requests! Well Done!",
  });
});

app.get("/usercocktails", async (req, res) => {
  const result = await db.query(
    `
       SELECT * FROM cocktails`
  );
  res.json(result.rows);
});

app.post("/usercocktails", async (req, res) => {
  const {
    username,
    cocktail_name,
    number_ingredients,
    recipe,
    difficulty,
    alcoholic,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO cocktails (username, cocktail_name, number_ingredients, recipe, difficulty, alcoholic) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        username,
        cocktail_name,
        number_ingredients,
        recipe,
        difficulty,
        alcoholic,
      ]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("NO INSERT FOR YOU", error);
    res.status(500).json({ success: false });
  }
});
