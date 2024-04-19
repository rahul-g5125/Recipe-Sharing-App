import connectToMongoDB from "@utils/database";
import { NextResponse } from "next/server";
import Recipe from "@models/recipe";

export async function PATCH(request){

    const data = await request.json();

    await connectToMongoDB();

    await Recipe.findOneAndUpdate({_id : data.id},
        {
            Recipe_Name : data.name,
            Ingredients : data.ingredients,
            Instructions : data.instructions,
            Cuisine : data.cuisine,
            Duration : data.duration,
            Calories : data.calories,
            Servings : data.servings,
            Spicy : data.spicy,
            Recipe_Image : data.image
        });

    return NextResponse.json({result:true});
}