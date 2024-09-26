import React from "react"
import { useLanguage } from '../../context/LanguageContext'
import { motion } from "framer-motion"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"

const DriverCoop = () => {
    const { t } = useLanguage()

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">

                </main>
            </motion.div>
        </>
    )
}

export default DriverCoop