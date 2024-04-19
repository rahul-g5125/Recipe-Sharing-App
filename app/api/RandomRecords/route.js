import connectToMongoDB from "@utils/database";
import { NextResponse } from "next/server";
import Recipe from "@models/recipe";

export async function GET(){

    // Before fetching data from database , make sure to establish connection with Database.
    await connectToMongoDB();

    // Randomly fetching 3 recipes from database to display it on the Home Page.
    const randomRecipes = await Recipe.aggregate([{ $sample: { size: 3 } }]);
    
    // We can send NextResponse.json({result:true}); to verify that whether requests are handled and return NextResponse.json({result:true,data:your_data}); to send the data back to the browser.
    return NextResponse.json({result:true,data:randomRecipes});
}