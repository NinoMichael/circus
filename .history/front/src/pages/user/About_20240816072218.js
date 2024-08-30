import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"

import gare from "../../images/assets/gare.webp"

const About = () => {
    const {t} = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <NavigationMenu2 />

             <main>
                <article className="bg-amber-400 text-black flex justify-center p-4">
                    <div className="w-96">
                        <h1 className = "font-kanit text-xl">{t('aboutTitle')}</h1>
                        <p className="text-sm">Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si</p>
                    </div>

                    <div>
                        <img src = {gare} alt = "Gare" width={450} height={250} className="rounded"/>
                    </div>
                </article>
             </main>
        </motion.div>
    )
}

export default About