// Client Side Data Fetching

'use client'

import ProfileNavbar from '@components/ProfileNavbar';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useEffect , useState , useRef } from 'react';
import ProfileRecipeCard from '@components/ProfileRecipeCard';
import Link from 'next/link';

// Custom Font from Google
const plusJakartaSansBold = Plus_Jakarta_Sans({
  subsets : ['latin'],
  weight : '800'
});

const plusJakartaSansNormal = Plus_Jakarta_Sans({
  subsets : ['latin'],
  weight : '400'
});


const Profile = () => {

  // To get session detials on Client Side
  const session_data = useSession();
  const [userRecipes,setUserRecipes] = useState();

  useEffect(() => {
      const getUserRecipes = async () => {

            // Fetching recipes from database by session user email.
            const response = await axios.post('api/getUserRecipes' , {
              email : session_data.data.user.email
            });
            
            console.log(response.data.data);
            setUserRecipes(response.data.data);
      }

    // The function is only called when the session_data contains the session data 
    if(session_data.data){
      getUserRecipes();
    }

    // [session_data.data,userRecipes] - ['some_value'] indicates that function in useEffect() will be called when the value of ['some value'] changes. Incase of a reload, the session_data.data becomes undefined and in a couple of seconds after the refresh the session data is again stored in the session_data. When we delete a recipe the value of userRecipes changes so to render only the available recipes we run this function which only will only load the avilable recipes in the database  .
  },[session_data.data]);

  return (
    
    <>

        <ProfileNavbar/>

        <h1 className={`${plusJakartaSansBold.className} text-[40px] mb-14 sm:text-[75px]`}>Your <span className='Home_green_gradient'>Recipes</span></h1>
    
        <div className='flex flex-col gap-16 mb-16 sm:flex sm:flex-row sm:gap-20 sm:flex-wrap sm:max-w-[1150px] sm:mb-20'>

          {/* we need to add  ( userRecipes && ) to check whether it contains data and is not undefined */}
          {userRecipes && userRecipes.map((userRecipe) => (

            // <Link href={`/${userRecipe._id}`}> this indicates that when we click on this, we will be redirected the route(page) - '/id_of_the_recipe' where we can get hold of the id of recipe as we have passed it along which is (id_of_the_recipe)
            // and we can then use it to get all the details of that recipe.
            <Link key={userRecipe._id} href={`/${userRecipe._id}`}>
                <ProfileRecipeCard
                    key={userRecipe._id}
                    recipe_img={userRecipe.Recipe_Image}
                    recipe_name={userRecipe.Recipe_Name}
                    profile_img={userRecipe.Profile_image}
                    username={userRecipe.Username}
                    cuisine={userRecipe.Cuisine}
                    id={userRecipe._id}
                />
            </Link>

          ))}  
      
        </div>

    </>

  )
}

export default Profile


// Server Side Data Fetching

// import Navbar from '@components/Navbar'
// import { Plus_Jakarta_Sans } from 'next/font/google'
// import RecipeCard from '@components/RecipeCard';
// import Link from 'next/link';
// import connectToMongoDB from '@utils/database';
// import Recipe from '@models/recipe';
// import { getServerSession } from 'next-auth';

// // Custom Font from Google
// const plusJakartaSansBold = Plus_Jakarta_Sans({
//   subsets : ['latin'],
//   weight : '800'
// });

// export async function profile_recipes(userEmail) {

//   // Before fetching data from database , make sure to establish connection with Database.
//   await connectToMongoDB();
  
//   // Fetching recipes from database by session user email.
//   const data = await Recipe.find({ Email : userEmail })

//   return data;
// }

// const profile = async () => {

//   // To get session details on Server Side
//   const session_data = await getServerSession(); 

//   const userRecipes = await profile_recipes(session_data.user.email);

//   return (
    
//     <>

//       <Navbar/>


//         <h1 className={`${plusJakartaSansBold.className} text-[40px] mb-14 sm:text-[75px]`}>Your <span className='Home_green_gradient'>Recipes</span></h1>
    

//         <div className='flex flex-col gap-16 sm:flex sm:flex-row sm:gap-20 sm:flex-wrap sm:max-w-[1150px]'>

//           {userRecipes && userRecipes.map((userRecipe) => (

//             <Link href={`/${userRecipe._id}`}>
//                 <RecipeCard
//                     key={userRecipe._id}
//                     recipe_img={userRecipe.Recipe_Image}
//                     recipe_name={userRecipe.Recipe_Name}
//                     profile_img={userRecipe.Profile_image}
//                     username={userRecipe.Username}
//                     cuisine={userRecipe.Cuisine}
//                 />
//             </Link>
          
//           ))}        

//         </div>

//     </>

//   )
// }

// export default profile;
