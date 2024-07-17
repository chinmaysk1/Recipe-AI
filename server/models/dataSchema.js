const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  favoriteCuisines: {
    type: [String],
    default: [],
  },
  foodAllergies: {
    type: [String],
    default: [],
  },
  diets: {
    type: [String],
    default: [],
  },
  excludedIngredients: {
    type: [String],
    default: [],
  },
  cookingSkills: {
    type: String,
    default: '',
  },
  cookingGoals: {
    type: String,
    default: '',
  },
});

const Preferences = mongoose.model('Preferences', PreferencesSchema);

module.exports = Preferences;