'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@components/Navbar';

// Custom Font from Google.
const plusJakartaSansBold = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '800'
});

const plusJakartaSansNormal = Plus_Jakarta_Sans({
  subsets : ['latin'],
  weight : '400'
});

// Here, Params is the data sent when we click on the link which directs us to this page. In this case, it is _id which helps in uniquely identifying each recipe.
const SingleRecipe = ({params}) => {

  const [recipeData , setRecipeData] = useState();

  // In useEffect() , useEffect(()=>{ , []} ) , Here the [] also known as Dependency Array. if you leave it empty , it inidcates that it will only execute once 
  useEffect(() => {
    const getRecipe = async () => {
        // Here , we get the recipes from the database that match the _id in the database
        const response = await axios.post('api/getRecipe', {
            id : params.recipe
        });
        
        console.log(response.data.data);
        setRecipeData(response.data.data);
    }

    getRecipe();

  });

  return (
    <>
        {
            recipeData &&

            <>  
                <Navbar/>
            
                <div className='w-full mb-10'>

                    <h1 className={`${plusJakartaSansBold.className} text-[40px] mb-5 sm:text-[75px]`}>{recipeData.Recipe_Name}</h1>

                    {/* If we want to resize the image having different width and height : 
                    1. we can do it by adding the width and height values to the parent element and make it relative 
                    2. And add fill, classname='object-cover' (Tailwind Css) to <Image> present in 'next/image' */}
                    <div className='w-full h-[300px] sm:h-[600px] relative'>
                        <Image
                            src={recipeData.Recipe_Image}
                            fill
                            alt='Recipe-Image'
                            className='object-cover rounded-xl'
                        />
                    </div>

                </div>

                <div className='w-full flex gap-3 mb-8 flex-wrap sm:gap-10 sm:mb-14'>
                    
                    <div className='max-w-fit max-h-fit p-2 px-3 flex items-center justify-between bg-[#b595ff] rounded-xl sm:p-3 sm:px-5'>
                        <Image
                            src='/assets/images/dish.png'
                            width={40}
                            height={40}
                            alt='Dish-icon'
                            className='pr-2'
                        />
                        <p className={`${plusJakartaSansNormal.className} text-[17px] sm:text-[20px] text-white`}>{recipeData.Cuisine}</p>
                    </div>

                    <div className='max-w-fit max-h-fit p-2 px-4 flex items-center justify-between bg-[#28DF99] rounded-xl sm:p-3 sm:px-5'>
                        <Image
                            src='/assets/images/Clock.png'
                            width={35}
                            height={35}
                            alt='clock-icon'
                            className='pr-2'
                        />
                        <p className={`${plusJakartaSansNormal.className} text-[17px] sm:text-[20px] text-white`}>{recipeData.Duration}</p>
                    </div>

                    <div className='w-full max-w-fit max-h-fit p-2 px-4 flex items-center justify-between bg-[#FFC07F] rounded-xl sm:p-3 sm:px-5'>
                        <Image
                            src='/assets/images/calories.png'
                            width={35}
                            height={35}
                            alt='calories-icon'
                            className='pr-2'
                        />
                        <p className={`${plusJakartaSansNormal.className} text-[17px] sm:text-[20px] text-white`}>{recipeData.Calories}&nbsp; Cal</p>
                    </div>

                    <div className='w-full max-w-fit max-h-fit p-2 px-4 flex items-center justify-between bg-[#8A84E2] rounded-xl sm:p-3 sm:px-5'>
                        <Image
                            src='/assets/images/new_servings.png'
                            width={35}
                            height={35}
                            alt='servings-icon'
                            className='pr-2'
                        />
                        <p className={`${plusJakartaSansNormal.className} text-[17px] sm:text-[20px] text-white`}>{recipeData.Servings}&nbsp; Servings</p>
                    </div>

                    <div className='w-full max-w-fit max-h-fit p-2 px-4 flex items-center justify-between bg-[#F15156] rounded-xl sm:p-3 sm:px-5'>
                        <Image
                            src='/assets/images/spicy.png'
                            width={35}
                            height={35}
                            alt='spicy-icon'
                            className='pr-2'
                        />
                        <p className={`${plusJakartaSansNormal.className} text-[17px] sm:text-[20px] text-white`}>{recipeData.Spicy}</p>
                    </div>

                </div>

                <div className='w-full mb-8 sm:mb-14'>
                    <h2 className={`${plusJakartaSansBold.className} text-[35px] mb-8 sm:text-[50px]`}>Ingredients</h2>
                    <p className={`${plusJakartaSansNormal.className} text-[18px] sm:text-[25px]`} dangerouslySetInnerHTML={{ __html: recipeData.Ingredients }} />
                </div>

                <div className='w-full mb-8 sm:mb-14'>
                    <h2 className={`${plusJakartaSansBold.className} text-[35px] mb-8 sm:text-[50px]`}>Instructions</h2>
                    <p className={`${plusJakartaSansNormal.className} text-[18px] sm:text-[25px]`} dangerouslySetInnerHTML={{ __html: recipeData.Instructions }} />
                </div>

            </>
        }    
        
    </>
  )
}

export default SingleRecipe;