import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@components/Navbar';
import Feed from '@components/Feed';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : '800'
});

const Home = () => {

  return (
    <>
      
        <Navbar/>

        <section className="w-full flex-center flex-col">
 
            <h1 className={`${plusJakartaSans.className} head_text text-center`}>
                Discover and Share 
                <br className="max-md:hidden"/>
                <span className="Home_green_gradient text_center"> Your Creative Recipes</span>
            </h1>

            <p className="desc text-center mb-24">
            RecipePedia is a culinary community where enthusiasts can explore and exchange their favorite recipes, fostering a diverse and delicious collective of home-cooked creations.
            </p>
            
            <Feed/>

        </section>
    </> 
  )
}

export default Home;