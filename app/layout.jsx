import '@styles/globals.css';
import { NextAuthProvider } from './Provider';

export const metadata = {
    title : 'RecipePedia',
    description : 'Discover and Share your creative home-made recipes'
}


const RootLayout = ({ children }) => {
  return (
        <html lang='en'>
            <body>
                <NextAuthProvider>

                    <div className='main'>
                        <div className='gradient'></div>
                    </div>

                    <main className='app'>
                        {children}
                    </main>

                </NextAuthProvider>
            </body>
        </html>
  )
}

export default RootLayout