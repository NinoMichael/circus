import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import Review from "../../components/Review"
import { Button } from "primereact/button"

import gare from "../../images/assets/gare.webp"

const About = () => {
    const {t} = useLanguage()

    const reviewsData = [
        {
            id : '1',
            rate : '4',
            review : 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username : 'Mirindra Harilala',
            imgProfile : '',
        },
        {
            id : '1',
            rate : '4',
            review : 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username : 'Tantely Ny Aina',
            imgProfile : '',
        },
        {
            id : '1',
            rate : '4',
            review : 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username : 'Tantely Ny Aina',
            imgProfile : '',
        },
        {
            id : '1',
            rate : '4',
            review : 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username : 'Tantely Ny Aina',
            imgProfile : '',
        }
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <NavigationMenu2 />

             <main>
                <article className="bg-amber-400 text-black flex justify-between py-8 px-44">
                    <div className = "mt-4">
                        <h1 className = "font-kanit text-3xl">{t('aboutTitle')}</h1>
                        <p className="text-sm w-[40vw] mt-4">Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si</p>
                    </div>

                    <div>
                        <img src = {gare} alt = "Gare" width={200} height={200} className="rounded w-80 h-48"/>
                    </div>
                </article>

                <article className = "mt-16">
                    <h2 className="text-center font-kanit text-xl">{t('reviewTitle')}</h2>
                    <p className="text-center text-sm mt-2">Lorem ipsum dolor emet si dolor emet si dolor emet si</p>

                    <section className="grid grid-cols-4 mt-8 mx-20">
                    {
                            reviewsData.map((review, index) => {
                                return <div key={index} className = "ms-5">
                                    <Review
                                    rate={review.rate}
                                    review={review.review}
                                    username={review.username == null ? "Guest" : review.username}
                                    userPhoto={review.imgProfile}
                                    />
                                </div>
                            })
                        }
                    </section>

                    <Button label = {t('seeAll')} className="flex justify-end mt-8 rounded px-4 py-2 font-poppins text-sm text-white bg-slate-900"/>
                </article>
             </main>
        </motion.div>
    )
}

export default About