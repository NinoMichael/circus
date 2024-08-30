import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"

const UseConditions = () => {
    const { t } = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />
            <h1 className="font-kanit text-3xl mt-8 ms-48">{t('conditionTitle')}</h1>
            <p>{t("conditionP")}</p>

            <article>
                <h2 className="text-xl font-semibold"></h2>
            </article>
        </motion.div >
    )
}

export default UseConditions