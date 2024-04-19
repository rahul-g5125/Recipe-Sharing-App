import { NextResponse } from "next/server";
import connectToMongoDB from "@utils/database";
import Recipe from "@models/recipe";
import { getServerSession } from "next-auth";

export async function POST(request){

    // To get session details on Server Side
    const session = await getServerSession();
    
    const data = await request.json();
    console.log(data);

    // Before fetching data from database , make sure to establish connection with Database.
    await connectToMongoDB();

    // Replace '\n' with '<br>' in ingredients and instructions
    const ingredientsWithLineBreaksReplaced = data.ingredients.replace(/\n/g, '<br/>');
    const instructionsWithLineBreaksReplaced = data.instructions.replace(/\n/g, '<br/>');

    // Used to store the data in the database
    Recipe.create({
        Email : session.user.email,
        Profile_image : session.user.image,
        Username : session.user.name,
        Recipe_Name : data.name,
        Ingredients : ingredientsWithLineBreaksReplaced,
        Instructions : instructionsWithLineBreaksReplaced,
        Cuisine : data.cuisine,
        Duration : data.duration,
        Calories : data.calories,
        Servings : data.servings,
        Spicy : data.spicy,
        Recipe_Image_Name : data.image_name,
        Recipe_Image : data.image
    });
    
    // We can send NextResponse.json({result:true}); to verify that whether requests are handled.
    return NextResponse.json({result: true});
}
