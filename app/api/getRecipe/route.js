import connectToMongoDB from "@utils/database";
import { NextResponse } from "next/server";
import Recipe from "@models/recipe";

export async function POST(request){

    const data = await request.json();
    const id = data.id;

    // Before fetching data from database , make sure to establish connection with Database.
    await connectToMongoDB();

    // Fetching a single recipe from database by id.
    const recipe = await Recipe.findById(id);
    
    // We can send NextResponse.json({result:true}); to verify that whether requests are handled and return NextResponse.json({result:true,data:your_data}); to send the data back to the browser.
    return NextResponse.json({result:true,data:recipe});
}