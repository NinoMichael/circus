import React from "react"
import { motion } from "framer-motion"
import DashHeaderAdmin from "../../components/inc/DashHeaderAdmin"
import { useLanguage } from "../../context/LanguageContext"
import DashmenuAdmin from "../../components/inc/DashmenuAdmin"

const DashboardAdmin = () => {
    const { t } = useLanguage()

    return (
        <>
            <DashmenuAdmin />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeaderAdmin />

                <main className="mt-3">


                </main>
            </motion.div>
        </>

    )
}

export default DashboardAdmin