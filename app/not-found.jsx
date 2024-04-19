import React from 'react';
import Image from 'next/image';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets : ['latin'],
    weight : 'variable'
});

const notFound = () => {
  return (
    <div className='h-screen flex  gap-5 justify-center items-center'>
            <Image
                src='/assets/images/new_error.png'
                width={100}
                height={100}
                alt='error-icon'
            />
            <p className={`${plusJakartaSans} text-[20px]`}>You broke the internet. Just kidding, this page does not exist.</p>
    </div>
  )
}

export default notFound;



// import React from 'react';
// import Image from 'next/image';
// import { Bebas_Neue } from 'next/font/google';

// const bebasNeue = Bebas_Neue({
//     subsets : ['latin'],
//     weight : '400'
// });

// const notFound = () => {
//   return (
//     <div className='bg-[#28DF99] w-screen h-screen flex justify-center items-center'>
//         <p className={`${bebasNeue.className} text-[100px] sm:text-[200px]`}>4&nbsp;0&nbsp;4</p>
//     </div>
//   )
// }

// export default notFound;