import React from 'react';
import UserHeader from '../../components/UserHeader';
import Search from '../../components/SearchBus';
import FooterLite from '../../components/FooterLite';

import voyage from '../../images/assets/voyage.jpg';
import gare from '../../images/assets/gare.webp';
import sprinter from '../../images/assets/sprinter.jpg';

export default function Home() {
    return (
        <main>  
            <UserHeader />

            <div>
                <Search />  
                
                 <section className='mt-12 grid grid-cols-[60%_40%] px-10 max-md:grid-cols-1 max-md:mt-6'>
                     <div>
                         <h1 className='text-4xl'>Bienvenue sur <span className=' text-green-900'>Circus</span>, la gare routière en ligne pour vous partout à Madagascar</h1>
                         <p className = "mt-6 text-lg font-medium">Réservez votre voyage partout dans la région maintenant !</p>
                         <p className = "mt-6 text-sm w-[85%]">Découvrez une nouvelle façon de voyager, où chaque trajet devient une expérience fluide et agréable. Simplifiez vos déplacements régionaux avec Circus – votre compagnon de voyage idéal.</p>
                     </div>
     
                     <div className='flex justify-center items-center space-x-2 -mt-12 max-md:mt-0'>
                         <img src= {voyage} alt = "Intro1" className='w-44 h-64 rounded object-cover'/>
                         <img src= {gare} alt = "Intro2" className='w-44 h-64 rounded object-cover mt-20'/>
                         <img src= {sprinter} alt = "Intro3" className='w-44 h-64 rounded object-cover'/>
                     </div>
                 </section>
            </div>
            
            <FooterLite className = "mt-12"/>
        </main>
    )
}
