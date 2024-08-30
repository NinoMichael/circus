import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu from "../../components/inc/NavigationMenu2"

const About = () => {
    const {t} = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="custom-bg-main pb-[3vh]">
             <NavigationMenu />

             <main>
                <div className="bg-amber-400 text-black flex justify-center">
                    <div>
                        <h1 className = "font-kanit text-xl">{t('aboutTitle')}</h1>
                        <p className="text-sm"></p>
                    </div>

                    <div>

                    </div>
                </div>
             </main>
        </motion.div>
    )
}

export default About