import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu"

const About = () => {
    const {t} = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="custom-bg-main pb-[3vh]">
             <NavigationMenu2 />

             <main>

             </main>
        </motion.div>
    )
}

export default About