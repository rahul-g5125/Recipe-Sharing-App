'use client'

import RecipeCard from './RecipeCard'
import axios from 'axios';
import { useEffect , useState } from 'react';
import Link from 'next/link';

const Feed = () => {

  const [recipes,setRecipes] = useState();
  const [userSearchText,setUserSearchText] = useState();
  const [userSearchRecipes,setUserSearchRecipes] = useState();

  // In useEffect() , useEffect(()=>{ , []} ) , Here the [] also known as Dependency Array. if you leave it empty , it inidcates that it will only execute once 
  useEffect(() => {
    const getRandomRecipes = async () => {

      // Randomly fetching 3 recipes from database to display it on the Home Page.
      const response = await axios.get('/api/RandomRecords');
      console.log(response.data);
      setRecipes(response.data.data);
    } 

    getRandomRecipes();
    
  }, []);


  useEffect(() => {
    const getSearchRecipes = async () => {

      // Fetching recipes from database based on recipe or cuisine
      const response = await axios.post('/api/searchRecipes',{
        searchText : userSearchText
      });
      console.log(response.data.data);
      setUserSearchRecipes(response.data.data);
    } 

    // The function is only called when the userSearchText contains userInput. 
    if(userSearchText){
      getSearchRecipes();
    }
    
  // [session_data.data] indicates that function in useEffect() will be called when the value of userSearchText changes. As the user types the input , the userSearchText keeps on changing. So we need to keep calling the function to make a valid search in the database.
  }, [userSearchText]);
  

  return (
    <>

      {/* If input field is empty then we render 3 random recipe from the database. Else, we render the recipes based on the input provided by the user */}
      {
         userSearchText ? 

         <>
            <input type="text" className='pl-5 p-2 rounded-xl w-full border outline-none text-lg mb-14 sm:mb-24 md:w-[600px]' placeholder='Search by Recipe or Cuisine' onChange={(e) => setUserSearchText(e.target.value)} required value={userSearchText}/> 

            <div className='flex flex-col gap-16 mb-20 sm:flex-row sm:flex-wrap sm:gap-20 sm:max-w-[1150px]'>

            {/* we need to add  ( userRecipes && ) to check whether it contains data and is not undefined */}
            {userSearchRecipes && userSearchRecipes.map((userSearchRecipe) => (

            // <Link href={`/${userRecipe._id}`}> this indicates that when we click on this, we will be redirected the route(page) - '/id_of_the_recipe' where we can get hold of the id of recipe as we have passed it along which is (id_of_the_recipe)
            // and we can then use it to get all the details of that recipe.
              <Link key={userSearchRecipe._id} href={`/${userSearchRecipe._id}`}>
                  <RecipeCard
                      key={userSearchRecipe._id}
                      recipe_img={userSearchRecipe.Recipe_Image}
                      recipe_name={userSearchRecipe.Recipe_Name}
                      profile_img={userSearchRecipe.Profile_image}
                      username={userSearchRecipe.Username}
                      cuisine={userSearchRecipe.Cuisine}
                  />
              </Link>

              ))}

            </div>

         </>

         :       
          <>
              <input type="text" className='pl-5 p-2 rounded-xl w-full border outline-none text-lg mb-14 sm:mb-24 md:w-[600px]' placeholder='Search by Recipe or Cuisine' onChange={(e) => setUserSearchText(e.target.value)} required value={userSearchText}/> 

              <div className='flex flex-col gap-16 mb-20 sm:flex-row sm:flex-wrap sm:gap-20 sm:max-w-[1150px]'>

                {/* we need to add  ( userRecipes && ) to check whether it contains data and is not undefined */}
                {recipes && recipes.map((recipe) => (

                  // <Link href={`/${userRecipe._id}`}> this indicates that when we click on this, we will be redirected the route  (page) - '/id_of_the_recipe' where we can get hold of the id of recipe as we have passed it along which is  (id_of_the_recipe)
                  // and we can then use it to get all the details of that recipe.
                  <Link key={recipe._id} href={`/${recipe._id}`}>
                      <RecipeCard
                          key={recipe._id}
                          recipe_img={recipe.Recipe_Image}
                          recipe_name={recipe.Recipe_Name}
                          profile_img={recipe.Profile_image}
                          username={recipe.Username}
                          cuisine={recipe.Cuisine}
                      />
                  </Link>

                ))}

              </div>
          </>
      }
      
      
    </>
  )
}

export default Feed;