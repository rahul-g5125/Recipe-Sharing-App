import Recipe from "@models/recipe";
import { NextResponse } from "next/server";

export async function DELETE(request){
    
    const data = await request.json();
    console.log(data);

    await Recipe.deleteOne({ _id : data.id });

    return NextResponse.json({result:true});
}