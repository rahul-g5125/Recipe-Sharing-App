import Recipe from "@models/recipe";
import connectToMongoDB from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request){

    const data = await request.json();
    const userEmail = data.email;
    
    // Before fetching data from database , make sure to establish connection with Database.
    await connectToMongoDB();

    // Fetching recipes from database by session user email.
    const userRecipes = await Recipe.find({ Email : userEmail })
    
    // We can send NextResponse.json({result:true}); to verify that whether requests are handled and return NextResponse.json({result:true,data:your_data}); to send the data back to the browser.
    return NextResponse.json({result:true,data:userRecipes});
}