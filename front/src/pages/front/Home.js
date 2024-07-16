import React from 'react';
import UserHeader from '../../components/UserHeader';
import Search from '../../components/SearchBus';
import { Carousel } from 'primereact/carousel';
import FooterLite from '../../components/FooterLite';

import voyage from '../../images/assets/voyage.jpg';
import gare from '../../images/assets/gare.webp';
import sprinter from '../../images/assets/sprinter.jpg';

export default function Home() {
    const imagesData1 = [
        { id: 1, src: voyage },
        { id: 2, src: gare },
        { id: 3, src: sprinter },
    ];

    const imagesData2 = [
        { id: 1, src: gare },
        { id: 2, src: sprinter },
        { id: 3, src: voyage },
    ];

    const imagesData3 = [
        { id: 1, src: sprinter },
        { id: 2, src: voyage },
        { id: 3, src: gare },
    ];

    const imageTemplate1 = (item) => {
        return (
            <img src={item.src} alt={`Intro ${item.id}`} className='w-44 h-64 max-[1170px]:w-32 max-[1170px]:h-52 max-md:w-44 max-md:h-64 max-sm:w-32 max-sm:h-52 max-xs:w-20 max-xs:h-40 rounded object-cover' />
        );
    };

    const imageTemplate2 = (item) => {
        return (
            <img src={item.src} alt={`Intro ${item.id}`} className='w-44 h-64 max-[1170px]:w-32 max-[1170px]:h-52 max-md:w-44 max-md:h-64 max-sm:w-32 max-sm:h-52 max-xs:w-20 max-xs:h-40 rounded object-cover mt-20' />
        );
    };

    const imageTemplate3 = (item) => {
        return (
            <img src={item.src} alt={`Intro ${item.id}`} className='w-44 h-64 max-[1170px]:w-32 max-[1170px]:h-52 max-md:w-44 max-md:h-64 max-sm:w-32 max-sm:h-52 max-xs:w-20 max-xs:h-40 rounded object-cover' />
        );
    };

    return (
        <main>  
            <UserHeader />

            <div className='flex flex-col max-md:flex-col-reverse'>
                <Search />  
                
                 <section className='mt-12 grid grid-cols-[60%_45%] max-[1330px]:grid-cols-[50%_50%] px-10 max-[1170px]:px-8 max-lg:grid-cols-[45%_55%] max-md:grid-cols-1 max-md:mt-6'>
                     <div>
                         <h1 className='text-4xl'>Bienvenue sur <span className=' text-green-900'>Circus</span>, la gare routière en ligne pour vous partout à Madagascar</h1>
                         <p className = "mt-6 text-lg font-medium">Réservez votre voyage partout dans la région maintenant !</p>
                         <p className = "mt-6 text-sm w-[85%]">Découvrez une nouvelle façon de voyager, où chaque trajet devient une expérience fluide et agréable. Simplifiez vos déplacements régionaux avec Circus – votre compagnon de voyage idéal.</p>
                     </div>
     
                     <div className='flex justify-center items-center space-x-2 -mt-12 max-md:mt-0 max-md:mx-6'>
                        <Carousel value={imagesData1} itemTemplate={imageTemplate1} numVisible={1} circular autoplayInterval={3000} showIndicators = {false} showNavigators ={false}/>
                        <Carousel value={imagesData2} itemTemplate={imageTemplate2} numVisible={1} circular autoplayInterval={3000} showIndicators = {false} showNavigators ={false}/>
                        <Carousel value={imagesData3} itemTemplate={imageTemplate3} numVisible={1} circular autoplayInterval={3000} showIndicators = {false} showNavigators ={false}/>                   
                     </div>
                 </section>
            </div>
            
            <FooterLite className = "mt-12 max-sm:mt-16"/>
        </main>
    )
}
