'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import ShareRecipeNavbar from '@components/ShareRecipeNavbar';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {toast, Toaster} from 'sonner';

// Custom Font from Google
const plusJakartaSansBold = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '800'
});

const plusJakartaSansNormal = Plus_Jakarta_Sans({
  subsets : ['latin'],
  weight : '400'
});

const RecipeData = () => {

  const [name,setName] = useState();
  const [ingredients,setIngredients] = useState();
  const [instructions,setInstructions] = useState();
  const [cuisine,setCuisine] = useState();
  const [duration,setDuration] = useState();
  const [calories,setCalories] = useState();
  const [servings,setServings] = useState();
  const [spicy,setSpicy] = useState();
  const [imageName,setImageName] = useState();
  const [image,setImage] = useState();
  const [base64img,setBase64Img] = useState();

  const handleSubmit = async (e) => {
    
    // Prevents refreshing of the Page
    e.preventDefault();

    // POST Request
    const Response = await axios.post('/api/RecipeFormData',{
      name : name,
      ingredients : ingredients,
      instructions : instructions,
      cuisine : cuisine,
      duration : duration,
      calories : calories,
      servings : servings,
      spicy : spicy,
      image : base64img,
    });
    console.log('Response : ',Response);

    toast.success('Recipe Uploaded');

    // Reseting the fields after the data is sent to the backend. 
    document.querySelector('.uploadImage').value = '';
    setName('');
    setIngredients('');
    setInstructions('');
    setCuisine('');
    setDuration('');
    setCalories('');
    setServings('');
    setSpicy('');
    setImageName('');
    setImage('');
  }

  // This function is called when we click anywhere on the box designed for upload. When we click on it we trigger a click function on the actual input type file making it possible to upload files
  const handleImage = () => {
    const upload_image = document.querySelector('.uploadImage');
    upload_image.click();
  }

  // It is used to convert the image into base64 format, and get the file name
  const handleFile = (event) => {
    const file = event.target.files[0];

    if(file){
      setImage(URL.createObjectURL(file));
      setImageName(file.name);

      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64Img(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <ShareRecipeNavbar/>  
        
      <section className='w-full flex-center flex-col'>
           
        <h1 className={`${plusJakartaSansBold.className} head_text text-center mb-16 sm:mb-28`}>
          Craft your <span className='Home_green_gradient mt-2 block sm:inline'>Recipe</span>
        </h1>
      

        <form className='w-full flex-col flex-center' onSubmit={handleSubmit}>

          <div className='sm:flex sm:gap-8'>

            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Name of the Recipe' value={name} onChange={(e) => {setName(e.target.value)}} required/> 

            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Specify the Cuisine' value={cuisine} onChange={(e)=>{setCuisine(e.target.value)}} required/>
          
          </div>

          <div className='sm:flex sm:gap-8'>
            
            <textarea cols="30" rows="10" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14  md:w-[550px]' placeholder='Ingredients for your recipe...' value={ingredients} onChange={(e)=>{setIngredients(e.target.value)}} required></textarea>

            <textarea cols="30" rows="10" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14  md:w-[550px]' placeholder='Instructions for your recipe...' value={instructions} onChange={(e)=>{setInstructions(e.target.value)}} required></textarea>
          
          </div>
      
          <div className='sm:flex sm:gap-8'>
            
            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Preparation time' value={duration} onChange={(e)=>{setDuration(e.target.value)}} required/>

            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Number of Calories' value={calories} onChange={(e)=>{setCalories(e.target.value)}} required/>
          
          </div>

          <div className='sm:flex sm:gap-8'>
          
            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Number of Servings' value={servings} onChange={(e)=>{setServings(e.target.value)}} required/>

            <input type="text" className='pl-5 p-3 rounded-xl w-full border text-lg outline-none mb-7 sm:mb-14 md:w-[550px]' placeholder='Spiciness Level (Mild, Medium, Hot)' value={spicy} onChange={(e)=>{setSpicy(e.target.value)}} required/>

          </div>

          <input type="file" className='hidden uploadImage' accept='image/*' onChange={handleFile} required/>

          {/* if image is selected, then we display the image and remove the onclick event disabling the ability to upload multiple images. if image is not selected,then we allow te user to upload the image  */}
          {
            image ? 

            <>

              <div className={`${plusJakartaSansNormal.className} w-full h-[150px] mb-3 border-[2.5px] border-dashed rounded-xl flex flex-col justify-center items-center bg-white sm:w-[1132px] sm:h-[200px] sm:mb-3 sm:flex sm:flex-col sm:justify-center sm:items-center`}>

                {/* We have to wrie 'image' here again to check otherwise it will give a null error */}
                {
                  image && 
                  <div className='w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] relative'>
                      <Image 
                        src={image}
                        fill
                        alt={imageName}
                        className='object-contain'
                  /> 
                  </div>
                }
      
              </div>

              <div className={`${plusJakartaSansNormal.className} bg-green-200 flex items-center justify-between rounded-lg w-full max-h-fit p-3 mb-10 sm:mb-14 sm:w-[1134px] sm:h-[45px]`}>

                <div className='flex items-center'>

                  <Image 
                    src='/assets/images/new_file.png'
                    width={20}
                    height={20}
                    alt='file_icon'
                    className='mr-1.5'
                  />

                  <p className='max-sm:max-w-[275px] max-sm:break-words'>{imageName}</p>

                </div>

                <Image 
                  src='/assets/images/delete.png'
                  width={20}
                  height={20}
                  alt='file_icon'
                  className='mr-1.5 cursor-pointer'
                  // After the image is selected, we can delete the image incase we would like to upload a different image
                  onClick={() => {setImage(null)}}
                />
             
              </div> 

              </>
            :

              <div className={`${plusJakartaSansNormal.className} w-full h-[150px] mb-10 border-[2.5px] border-dashed rounded-xl flex flex-col justify-center items-center bg-white cursor-pointer disableClick sm:w-[1132px] sm:h-[200px] sm:mb-14 sm:flex sm:flex-col sm:justify-center sm:items-center`} onClick={handleImage}>

                <Image
                  src="/assets/images/upload_image.png"
                  width={70}
                  height={70}
                  alt='uplaod_image_icon'
                />

                <p className='text-lg text-gray-400'>Browse&nbsp; Files&nbsp; to&nbsp; Upload</p>
      
              </div>

          }
          
          <input type='submit' className='cursor-pointer bg-[#28DF99] text-white text-lg p-3.5 px-16 mb-20 rounded-xl border transition-all hover:bg-white hover:text-[#28DF99] hover:border-[#28DF99]'></input>

          <Toaster richColors/>

        </form>

      </section>

    </>
    );
}

export default RecipeData;