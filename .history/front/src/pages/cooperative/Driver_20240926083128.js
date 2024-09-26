import React from "react"
import { useLanguage } from '../../context/LanguageContext'
import { motion } from "framer-motion"
import Dashmenu from "../../components/inc/Dashmenu"

const DriverCoop = () => {
    const { t } = useLanguage()

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50"></motion.div>
        </>
    )
}

export default DriverCoop