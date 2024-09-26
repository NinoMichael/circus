import React from "react"
import DashHeader from "../../components/inc/DashHeader"
import Dashmenu from "../../components/inc/Dashmenu"
import { motion } from "framer-motion"
import { DataView } from 'primereact/dataview'
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "primereact/button"
import { Tag } from "primereact/tag"
import { Link } from "react-router-dom"

import imgBus1 from '../../images/assets/sprinter.png'

const BusCoop = () => {
    const { t } = useLanguage()

    const datas = [
        {
            id: 1,
            matricule: 'TAF 1234',
            chauffeur: 'Tantely',
            statut: t('available'),
            voyage: 'Antananarivo - Mahajanga',
            img: imgBus1,
        },
        {
            id: 1,
            matricule: 'TAF 1234',
            chauffeur: 'Tantely',
            statut: 'Vacant',
            img: imgBus1,

        },
        {
            id: 1,
            matricule: 'TAF 1234',
            chauffeur: 'Tantely',
            statut: t('repair'),
            img: imgBus1,

        },
        {
            id: 1,
            matricule: 'TAF 1234',
            chauffeur: 'Tantely',
            statut: 'Vacant',
            img: imgBus1,
        }
    ]

    const getSeverity = (data) => {
        switch (data.statut) {
            case t('available'):
                return 'success'

            case 'Vacant':
                return 'warning'

            case t('repair'):
                return 'danger'

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
                    <Link to=""><Button className="bg-white border border-none outline outline-none text-sm text-gray-600 hover:text-red-500 mx-2" icon="pi pi-trash" /></Link>
                </div>
            </div>
        )
    }

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null

        let list = items.map((bus, index) => {
            return renderGridBus(bus, index)
        })

        return <div className="grid grid-cols-4 gap-x-4 ms-8 me-6 mt-5">{list}</div>
    }

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t('listBus')}</h1>

                        <div className="flex justify-start">
                            <Button label={t('addBus')} className="font-poppins text-sm" icon="pi pi-plus" />
                        </div>
                    </div>

                    <DataView value={datas} listTemplate={listTemplate} />
                </main>

            </motion.div>
        </>
    )
}

export default BusCoop