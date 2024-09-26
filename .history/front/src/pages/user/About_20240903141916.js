import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import Review from "../../components/Review"
import { Button } from "primereact/button"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Carousel } from "primereact/carousel"
import { Link } from "react-router-dom"

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
            title: t('mission1Title'),
            text: t('mission1Txt')
        },
        {
            icon: 'pi pi-user',
            title: t('mission2Title'),
            text: t('mission2Txt')
        },
        {
            icon: 'pi pi-microchip',
            title: t('mission3Title'),
            text: t('mission3Txt')
        },
        {
            icon: 'pi pi-shield',
            title: t('mission4Title'),
            text: t('mission4Txt')
        },
    ]

    const reviewsData = [
        {
            id: '1',
            rate: '4',
            review: "Circus m'a simplifié la vie. Réserver un transport régional n'a jamais été aussi rapide et facile. Une application incontournable pour mes déplacements!",
            username: 'Mirindra Harilala',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: "Service impeccable ! J'ai pu organiser un voyage sur mesure sans stress. La location de véhicule était exactement ce qu'il me fallait.",
            username: 'Tantely Ny Aina',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: "Circus est vraiment pratique pour les escapades régionales. J'adore la simplicité de l'interface et la rapidité des réservations. Je recommande vivement !",
            username: 'Tantely Ny Aina',
            imgProfile: '',
        },
        {
            id: '1',
            rate: '4',
            review: "Une expérience utilisateur parfaite. Les options de transport sont variées et les prix transparents. J'ai trouvé exactement ce que je cherchais en quelques clics.",
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
                <img src={imgData.img} alt="Ville Madagascar" width={250} height={250} className="w-80 h-64 rounded max-[1170px]:w-72 max-[1170px]:h-52" />
            </>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <main>
                <article className="bg-amber-400 text-black flex justify-between py-8 px-44 max-[1170px]:px-28 max-[900px]:mt-8 max-[900px]:px-16 max-md:flex-col max-md:items-center max-md:mx-auto max-md:justify-center">
                    <div className="mt-4">
                        <h1 className="font-kanit text-3xl max-md:text-center">{t('aboutTitle')}</h1>
                        <p className="text-sm w-[40vw] mt-4 max-md:text-center">{t('aboutHeaderTitle')}</p>
                    </div>

                    <div className="max-[900px]:mt-6">
                        <img src={gare} alt="Gare" width={200} height={200} className="rounded w-80 h-64 max-[900px]:w-72 max-[900px]:h-52" />
                    </div>
                </article>

                <article className="mt-16">
                    <h2 className="text-center font-kanit text-2xl">{t('missionCircus')}</h2>
                    <p className="text-center text-sm mt-2">{t('missionP')}</p>

                    <section className="flex justify-center mt-8 mx-48 max-[1170px]:mx-24 max-[900px]:mx-4 max-md:flex-col max-md:items-center max-md:mx-auto">
                        <div className="ms-20 mt-8 max-md:ms-24 me-2 max-md:mt-0">
                            <Carousel value={imgDatas} numVisible={1} numScroll={1} itemTemplate={ImgCarousel} showIndicators={false} showNavigators={false} circular autoplayInterval={3000} className="w-96" />
                        </div>

                        <div className="w-[140%] max-[900px]:-ms-12 max-md:ms-0">
                            {missionsData.map((mission, index) => (
                                <div key={index} className="flex justify-start mb-6 max-md:mx-auto max-md:items-center max-md:justify-center max-md:w-96 max-md:mt-6">
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

                <article className="flex flex-row justify-center mt-24 mb-24 space-x-40 max-[900px]:space-x-16 max-md:flex-col max-md:items-center max-md:mx-auto">
                    <div className="-mt-6">
                        <h2 className="text-2xl font-kanit mt-4 max-md:text-center">{t('specialBookTitle')}</h2>
                        <p className="text-sm mt-6 w-80 max-md:text-center">{t('specialBookTxt')}</p>

                        <Link to=""><Button label={t('bookBus')} className="font-poppins text-sm bg-slate-900 text-white border border-none outline outline-none rounded mt-16 px-5 py-2 max-md:ms-6" /></Link>
                    </div>

                    <div>
                        <img src={gare} alt="Réservation spéciale" width={300} height={300} className="w-96 h-80 rounded max-[900px]:h-52 max-[900px]:w-72 max-[900px]:mt-10" />
                    </div>
                </article>

                <article className="mt-16">
                    <h2 className="text-center font-kanit text-xl">{t('reviewTitle')}</h2>
                    <p className="text-center text-sm mt-2">Lorem ipsum dolor emet si dolor emet si dolor emet si</p>

                    <section className="grid grid-cols-4 mt-8 mx-20 max-[900px]:mx-6">
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

                    <Link to=""><Button label={t('seeAll')} className="bg-slate-900 text-white border border-none outline outline-none font-poppins flex justify-center items-center mx-auto mt-12 mb-16 px-8 py-2 text-sm" /></Link>
                </article>

                <FooterMain />
            </main >
        </motion.div >
    )
}

export default About