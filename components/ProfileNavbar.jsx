'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn , signOut , useSession } from "next-auth/react"
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from "next/navigation";

const plusJakartaSansNormal = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '600'
});

const plusJakartaSansBold = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '800'
});

const ProfileNavbar = () => {

  const [ToggleDropdown, setToggleDropdown] = useState(false);

  // to get session details on Client side   
  const session_data = useSession();

  // The useRouter hook allows you to programmatically change routes inside Client Components
  const router = useRouter();

  return (

    <nav className="flex-between w-full mb-16 pt-10">
        
        {/* Left part of Navbar */}
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/assets/images/Cookbook.png"
                width={40}
                height={40}
                className="object-contain"
                alt="profile"
            />
            <div className={plusJakartaSansBold.className}>
                <p className="logo_text">Recipe<span className="text-[#3dd098]">Pedia</span></p>
            </div>
        </Link>

        {/* Right part of Navbar for Desktop Navigation */}
        <div className="hidden sm:flex">
            {
                (session_data.status==='authenticated') ? (
                    <div className="flex gap-3 items-center md:gap-3">

                        <Link href="/Share-Recipe" className="black_btn" onClick={()=>{setisClicked(true)}}>
                            Share Recipe
                        </Link>

                        {/* After signing out , it will be redirected to the Home Pages */}
                        <button onClick={() => {signOut({ redirect: false , callbackUrl : '/'}); router.push('/')}} className="green_btn">
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image 
                                src={session_data.data.user.image}
                                width={40}
                                height={40}
                                className="object-contain ml-4 rounded-full"
                                alt="profile"
                            />
                        </Link>

                    </div>
                )
                
                : (
                    <div>
                        <button onClick={() => signIn('google')} className="black_btn">
                            Sign In
                        </button>
                    </div>
                )
            
            } 

        </div>

        {/* Right part of Navbar for Mobile Navigation */}
        <div className="flex sm:hidden">
            {
                (session_data.status==='authenticated') ? (
                    <div className="flex items-center">

                            <Image 
                                src={session_data.data.user.image}
                                width={40}
                                height={40}
                                className="object-contain ml-4 rounded-full"
                                alt="profile"
                                onClick={() => {setToggleDropdown(!ToggleDropdown)}}
                            />

                            {
                                ToggleDropdown && (
                                    <div className="profile_dropdown z-10">

                                        <Link href="/" className="dropdown_link" onClick={()=> setToggleDropdown(false)}>
                                            <p className={`${plusJakartaSansNormal.className} text-base`}>Home</p>
                                        </Link>

                                        <Link href="/Share-Recipe">
                                            <p className={`${plusJakartaSansNormal.className} text-base`}>Share&nbsp; Recipe</p>
                                        </Link>

                                        {/* After signing out , it will be redirected to the Home Pages */}
                                        <button onClick={() => {signOut({ redirect: false , callbackUrl : '/'}); router.push('/')}} className="black_btn w-full mt-3">
                                             Sign Out
                                        </button>

                                    </div>
                                )
                            }

                    </div>
                )

                : (
                    <div>

                        <button onClick={() => signIn('google')} className="black_btn">
                            Sign In
                        </button>

                    </div>
                )
            }
            
        </div>


    </nav>
  )
}

export default ProfileNavbar;