import Recipe from "@models/recipe";
import connectToMongoDB from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request){

    const data = await request.json();
    const recipe_or_cuisine = data.searchText;
    
    // Before fetching data from database , make sure to establish connection with Database.
    await connectToMongoDB();

    // Fetching recipes from database based on recipe or cuisine
    const searchedRecipes = await Recipe.find(
        {
            $or: [
                { Recipe_Name: new RegExp(recipe_or_cuisine, 'i') },
                { Cuisine : new RegExp(recipe_or_cuisine, 'i') },
              ]
    });

    // We can send NextResponse.json({result:true}); to verify that whether requests are handled and return NextResponse.json({result:true,data:your_data}); to send the data back to the browser.
    return NextResponse.json({result:true,data:searchedRecipes});
}