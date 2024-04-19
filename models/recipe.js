import { mongoose , Schema } from "mongoose";

const recipeSchema = new Schema({
    Email : String,
    Profile_image : String,
    Username : String,
    Recipe_Name : String,
    Ingredients : String,
    Instructions : String,
    Cuisine : String,
    Duration : String,
    Calories : String,
    Servings : String,
    Spicy : String,
    Recipe_Image : String,
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe' , recipeSchema);

export default Recipe;