import React from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"

const AddBus = () => {
    const { t } = useLanguage()

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t('addBus')}</h1>
                        <i className="pi pi-info-circle text-xl"></i>
                    </div>

                    <section className="grid grid-cols-2">
                        <div></div>
                    </section>
                </main>
            </motion.div>
        </>
    )
}

export default AddBus