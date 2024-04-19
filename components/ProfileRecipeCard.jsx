'use client'

import React from 'react';
import Image from 'next/image';
import {Plus_Jakarta_Sans} from 'next/font/google'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';

const plusJakartaSansBold = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '600'
});

const plusJakartaSansNormal = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '400'
});

const ProfileRecipeCard = (props) => {

  const handleDelete = async (e) => {

    e.preventDefault();
    
    const response = await axios.delete('api/delete',{data: {id:props.id}});

    if(response){
        toast.success('Recipe Removed');
        window.location.reload(); // we can either use this or simply add userRecipes in the dependency array in useEffect of profile/page.jsx 
    }

  }

  return (
    <div className='border border-gray-300 rounded-xl p-5 shadow-sm bg-white w-[326px] max-h-fit relative'>

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

            <Link href={`/edit/${props.id}`}>
                <div className='absolute bottom-[18px] right-[70px] text-white p-2.5 rounded-full bg-[#c2ffd8]'>
                    <div className='w-[22px] h-[22px] relative'>
                        <Image
                            src="/assets/images/edit.png"
                            fill
                            className='object-cover'
                            alt='edit-icon'
                        />
                    </div>
                </div>
            </Link>

            <div className='absolute bottom-[18px] right-4 text-white p-2.5 rounded-full bg-[#c2ffd8]' onClick={handleDelete}>
                <div className='w-[22px] h-[22px] relative'>
                    <Image
                        src="/assets/images/delete.png"
                        fill
                        className='object-cover'
                        alt='delete-icon'
                    />
                </div>
            </div>

            <Toaster richColors/>
          
    </div>
  )
}

export default ProfileRecipeCard;