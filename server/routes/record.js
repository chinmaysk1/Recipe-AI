import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("preferences");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:email", async (req, res) => {
  try {
    let collection = await db.collection("preferences");
    let query = { email: req.params.email };
    let result = await collection.findOne(query);

    if (!result) res.status(404).send("Preferences not found");
    else res.status(200).json(result); // Use .json() to set proper Content-Type
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving preferences");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("preferences");
    let existingDocument = await collection.findOne({ email: req.body.email });
    
    if (existingDocument) {
      // Update existing record
      const updates = {
        $set: {
          cookingGoals: req.body.cookingGoals,
          cookingSkills: req.body.cookingSkills,
          diets: req.body.diets,
          excludedIngredients: req.body.excludedIngredients,
          favoriteCuisines: req.body.favoriteCuisines,
          foodAllergies: req.body.foodAllergies,
        },
      };
      let result = await collection.updateOne({ email: req.body.email }, updates);
      res.send(result).status(200);
    } else {
      // Create new record
      let newDocument = {
        email: req.body.email,
        cookingGoals: req.body.cookingGoals,
        cookingSkills: req.body.cookingSkills,
        diets: req.body.diets,
        excludedIngredients: req.body.excludedIngredients,
        favoriteCuisines: req.body.favoriteCuisines,
        foodAllergies: req.body.foodAllergies,
      };
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding or updating record");
  }
});

// This section will help you update a record by id.
router.patch("/:email", async (req, res) => {
  try {
    const query = { email: req.params.email };
    const updates = {
      $set: {
        cookingGoals: req.body.cookingGoals,
        cookingSkills: req.body.cookingSkills,
        diets: req.body.diets,
        excludedIngredients: req.body.excludedIngredients,
        favoriteCuisines: req.body.favoriteCuisines,
        foodAllergies: req.body.foodAllergies,
      },
    };

    let collection = await db.collection("preferences");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("preferences");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;