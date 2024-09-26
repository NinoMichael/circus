import React from "react"
import { useLanguage } from '../../context/LanguageContext'
import { motion } from "framer-motion"
import { Button } from "primereact/button"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"

const DriverCoop = () => {
    const { t } = useLanguage()

    const datas = [
        {
            id: 1,
            chauffeur: 'ANDRIANARIDERA Tantely',
        },
    ]

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t('listDriver')}</h1>

                        <div className="flex justify-start">
                            <Button label={t('addDriver')} className="font-poppins text-sm" icon="pi pi-plus" />
                        </div>
                    </div>


                </main>
            </motion.div>
        </>
    )
}

export default DriverCoop