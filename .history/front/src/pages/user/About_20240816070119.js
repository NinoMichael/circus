import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"

const About = () => {
    const {t} = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="custom-bg-main pb-[3vh]">

        </motion.div>
    )
}

export default About