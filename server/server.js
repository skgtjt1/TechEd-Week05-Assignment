import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
dotenv.config();

app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:5173",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: "Content-Type, Authorization",
  })
);

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

// adding a delete endpoint

app.delete("/usercocktails/:id", async (req, res) => {
  //the :id allows the unique table id to be passed along from the client
  const { id } = req.params; //the params property is how you access the id passed along from the url into the id object

  try {
    const result = await db.query(`DELETE FROM cocktails WHERE id = $1`, [id]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Cocktail not found" });
    }
  } catch (error) {
    console.error("Failed to delete cocktail", error);
    res.status(500).json({ success: false });
  }
});

app.patch("/usercocktails/:id/score", async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  if (typeof value !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid score value" });
  }

  try {
    const result = await db.query(
      `UPDATE cocktails SET user_score = user_score + $1 WHERE id = $2 RETURNING user_score`,
      [value, id]
    );

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, user_score: result.rows[0].user_score });
    } else {
      res.status(404).json({ success: false, message: "Cocktail not found" });
    }
  } catch (error) {
    console.error("Failed to update user score", error);
    res.status(500).json({ success: false });
  }
});
