import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"

const UseConditions = () => {
    const { t } = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <article>
                <article>


                    <article>

                    </article>
                </motion.div >
                )
}

                export default UseConditions