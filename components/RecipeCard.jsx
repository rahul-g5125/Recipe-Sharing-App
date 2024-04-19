import React from 'react';
import Image from 'next/image';
import {Plus_Jakarta_Sans} from 'next/font/google'

const plusJakartaSansBold = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '600'
});

const plusJakartaSansNormal = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '400'
});

const RecipeCard = (props) => {
  return (
    <div className='border border-gray-300 rounded-xl p-5 shadow-sm bg-white w-[326px] relative'>

            <div className='w-[284px] h-[220px] relative mb-3'>
                <Image
                    src={props.recipe_img}
                    fill
                    className="object-cover rounded-3xl"
                    alt="profile"
                />
            </div>

            <div className={plusJakartaSansBold.className}>
                <p className='pl-2 text-lg mb-2 max-w-[276px] break-words'>{props.recipe_name}</p>
            </div>
     
            
            <div className='flex gap-4 items-center pl-2'>

                <div>
                    <Image
                        src={props.profile_img}
                        width={35}
                        height={35}
                        className="object-contain rounded-full"
                        alt="profile"
                    />
                </div>

                <div className={plusJakartaSansNormal.className}>
                    <div className='w-[220px]'>
                        <p className='text-base text-gray-500 font-semibold'>{props.username}</p>
                    </div>
                </div>

            </div>

            <p className='absolute top-9 right-9 text-white p-2 px-3 rounded-3xl bg-[#28DF99] flex gap-1'>
                <Image
                    src="/assets/images/dish.png"
                    width={25}
                    height={25}
                    alt='clock'
                />
                {props.cuisine}
            </p>
    </div>
  )
}

export default RecipeCard