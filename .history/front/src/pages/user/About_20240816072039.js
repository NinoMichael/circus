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
                <div className="bg-amber-400 text-black flex justify-center">
                    <div>
                        <h1 className = "font-kanit text-xl">{t('aboutTitle')}</h1>
                        <p className="text-sm">Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si</p>
                    </div>

                    <div>
                        <img src = {gare} alt = "Gare" width={200} height={200}/>
                    </div>
                </div>
             </main>
        </motion.div>
    )
}

export default About