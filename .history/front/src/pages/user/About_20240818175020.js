import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import Review from "../../components/Review"
import { Button } from "primereact/button"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Carousel } from "primereact/carousel"

import gare from "../../images/assets/gare.webp"
import rn4 from "../../images/assets/rn4.jpg"
import isalo from "../../images/assets/isalo.jpg"
import tana from "../../images/assets/tana.png"
import FooterMain from "../../components/inc/FooterMain"

const About = () => {
    const { t } = useLanguage()

    const missionsData = [
        {
            icon: 'pi pi-car',
            title: 'Lorem ipsum dolor emet si',
            text: 'Lorem ipsum dolor emet si'
        },
        {
            icon: 'pi pi-car',
            title: 'Lorem ipsum dolor emet si',
            text: 'Lorem ipsum dolor emet si'
        },
        {
            icon: 'pi pi-car',
            title: 'Lorem ipsum dolor emet si',
            text: 'Lorem ipsum dolor emet si'
        },
        {
            icon: 'pi pi-car',
            title: 'Lorem ipsum dolor emet si',
            text: 'Lorem ipsum dolor emet si'
        },
    ]

    const reviewsData = [
        {
            id: '1',
            rate: '4',
            review: 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username: 'Mirindra Harilala',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username: 'Tantely Ny Aina',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username: 'Tantely Ny Aina',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: 'Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet si ',
            username: 'Tantely Ny Aina',
            imgProfile: '',
        }
    ]

    const imgDatas = [
        { id: 1, img: rn4 }, { id: 2, img: isalo }, { id: 3, img: tana }
    ]

    const ImgCarousel = (imgData) => {
        return (
            <>
                <img src={imgData.img} alt="Ville Madagascar" width={250} height={250} className="w-80 h-64 rounded" />
            </>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <main>
                <article className="bg-amber-400 text-black flex justify-between py-8 px-44">
                    <div className="mt-4">
                        <h1 className="font-kanit text-3xl">{t('aboutTitle')}</h1>
                        <p className="text-sm w-[40vw] mt-4">Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si</p>
                    </div>

                    <div>
                        <img src={gare} alt="Gare" width={200} height={200} className="rounded w-80 h-48" />
                    </div>
                </article>

                <article className="mt-16">
                    <h2 className="text-center font-kanit text-2xl">{t('missionCircus')}</h2>
                    <p className="text-center text-sm mt-2">Lorem ipsum dolor emet si dolor emet si dolor emet si</p>

                    <section className="flex justify-center mt-8 mx-48">
                        <div className="ms-24">
                            <Carousel value={imgDatas} numVisible={1} numScroll={1} itemTemplate={ImgCarousel} showIndicators={false} showNavigators={false} circular autoplayInterval={3000} className="w-96" />
                        </div>

                        <div className="w-[140%]">
                            {missionsData.map((mission, index) => (
                                <div key={index} className="flex justify-start mb-6">
                                    <i className={`${mission.icon} me-3 mt-4`}></i>

                                    <div>
                                        <h5 className="font-semibold">{mission.title}</h5>
                                        <p className="text-sm">{mission.text}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </section>
                </article>

                <article className="flex flex-row mt-24 mx-24">
                    <div>
                        <h2 className="text-2xl mt-4">{t('specialBookTitle')}</h2>
                        <p className="text-sm mt-6">{t('specialBookTxt')}</p>
                    </div>
                </article>

                <article className="mt-16">
                    <h2 className="text-center font-kanit text-xl">{t('reviewTitle')}</h2>
                    <p className="text-center text-sm mt-2">Lorem ipsum dolor emet si dolor emet si dolor emet si</p>

                    <section className="grid grid-cols-4 mt-8 mx-20">
                        {
                            reviewsData.map((review, index) => {
                                return <div key={index} className="ms-5">
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

                    <Button label={t('seeAll')} className="flex justify-end items-end ml-auto me-20 mt-8 rounded px-5 py-2 font-poppins text-sm text-white bg-slate-900 border border-none outline outline-none" />
                </article>

                <article className="mt-16 mx-24">
                    <h2 className="font-kanit text-xl text-center">{t('faqTitle')}</h2>
                    <p className="text-center text-sm mt-2">Lorem ipsum dolor emet si dolor emet si dolor emet si</p>

                    <section className="flex justify-center space-x-6 mt-8">
                        <Accordion multiple className="w-[49vw] font-poppins text-black font-light text-sm">
                            <AccordionTab header={t('question1')}>
                                <p>{t('reponse1')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question2')}>
                                <p>{t('reponse2')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question3')}>
                                <p>{t('reponse3')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question4')}>
                                <p>{t('reponse4')}</p>
                            </AccordionTab>
                        </Accordion>

                        <Accordion multiple className="w-[49vw] font-poppins text-black font-light text-sm">
                            <AccordionTab header={t('question5')}>
                                <p>{t('reponse5')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question6')}>
                                <p>{t('reponse6')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question7')}>
                                <p>{t('reponse7')}</p>
                            </AccordionTab>
                            <AccordionTab header={t('question8')}>
                                <p>{t('reponse8')}</p>
                            </AccordionTab>
                        </Accordion>
                    </section>
                </article>

                <FooterMain />
            </main >
        </motion.div >
    )
}

export default About