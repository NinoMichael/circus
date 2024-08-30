import React from "react"
import { useLanguage } from "../../context/LanguageContext"

const UseConditions = () => {
    const { t } = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

        </motion.div >
    )
}

export default UseConditions