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

    const getSeverity = (data) => {
        switch (data.statut) {
            case 'Disponible':
                return 'success'

            case 'Vacant':
                return 'warning'

            default:
                return null
        }
    }

    const renderGridBus = (bus, index) => {
        return (
            <div className="col-12 bg-white border shadow-sm rounded" key={index}>
                <div className="relative">
                    <img src={bus.img} alt="Bus" width={150} height={150} className="w-full h-36 rounded-t" />
                    <Tag value={bus.statut} severity={getSeverity(bus)} className="absolute top-2 right-2 text-[0.65em] font-poppins font-normal"></Tag>
                </div>

                <div className="p-4">
                    <h4 className="font-poppins text-black text-xs"><i className="pi pi-car me-2"></i>{bus.matricule}</h4>
                    <p className="font-poppins text-black text-xs font-thin"><i className="pi pi-user me-2"></i>{bus.chauffeur}</p>
                </div>

                <div className="flex justify-between">
                    <Link to=""><Button className="bg-white border border-none outline outline-none text-sm text-gray-600 mx-2" icon="pi pi-pen-to-square" /></Link>
                    <Link to=""><Button className="bg-white border border-none outline outline-none text-sm text-gray-600 mx-2" icon="pi pi-trash" /></Link>
                </div>
            </div>
        )
    }

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