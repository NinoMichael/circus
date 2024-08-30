import React from "react"
import { motion } from "framer-motion"
import NavigationMenu from "../components/inc/NavigationMenu"
import { useLanguage } from "../context/LanguageContext"
import SearchBar from "../components/SearchBar"

const Homepage = () => {
    const { t } = useLanguage()

    const infoStats = [
        {
            stat: '+50',
            info: t('cooperatives'),
        },
        {
            stat: '+2K',
            info: t('travelers'),
        },
        {
            stat: '+500',
            info: t('transportations'),
        }
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="custom-bg-main pb-[3.2vh]">
            <NavigationMenu />

            <main className="flex justify-between mx-5 mt-12 max-[1140px]:flex-col max-[1140px]:items-center max-[1140px]:mx-auto">
                <div className="ms-16 max-[520px]:ms-4">
                    <h1 className="text-5xl font-semibold text-white font-kanit max-[1140px]:text-center max-[520px]:text-4xl">{t('welcome')}</h1>
                    <h2 className="text-2xl font-medium text-white w-96 max-[1140px]:w-[80%] max-[1140px]:text-center max-[520px]:text-xl mt-2 max-[1140px]:mx-auto">{t('platform')}</h2>
                </div>

                <div className="me-6 max-[1200px]:me-0  max-[1140px]:mt-12">
                    <h3 className="text-lg font-medium font-kanit text-white text-center mt-3 mb-8 max-[1140px]:mx-auto">{t('search')}</h3>
                    <SearchBar />
                </div>
            </main>

            <footer className="flex max-sm:flex-col justify-between mt-72 max-[1110px]:mt-52 max-sm:mt-36 mx-5">
                <div className="flex -mt-12 max-[900px]:space-x-6 ms-10 max-sm:mx-auto max-sm:justify-center max-sm:space-x-16 max-xs:space-x-8 space-x-20">
                    {infoStats.map((infoStat, index) => (
                        <div key={index} className="text-white text-center">
                            <p className="text-3xl max-xs:text-xl text-center">{infoStat.stat}</p>
                            <p className="text-base max-xs:text-sm text-center">{infoStat.info}</p>
                        </div>
                    ))}
                </div>

                <div className="max-sm:mt-8">
                    <p className="text-white text-xs max-xs:text-[0.65em] max-sm:text-center">{t('copyright')}</p>
                </div>
            </footer>
        </motion.div>
    )
}

export default Homepage