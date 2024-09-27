import React, { useState, useEffect } from "react"
import { useLanguage } from '../../context/LanguageContext'
import { getChauffeurs } from "../../utils/apiService"
import { motion } from "framer-motion"
import { Button } from "primereact/button"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { DataView } from "primereact/dataview"
import { Tag } from "primereact/tag"
import { Avatar } from "primereact/avatar"
import { Link } from "react-router-dom"

//import imgDriver from '../../images/assets/driver.png'

const DriverCoop = () => {
    const { t } = useLanguage()
    const [dataDriver, setDataDriver] = useState([])

    useEffect(() => {
        const fetchChauffeurs = async () => {
            const response = await getChauffeurs();
            const datas = response.map(chauffeur => ({
                id: chauffeur.id_chauffeur,
                nom: chauffeur.nom_chauffeur,
                age: chauffeur.age || 32,
                img: chauffeur.img,
            }));
            setDataDriver(datas);
        };

        fetchChauffeurs();
    }, []);

    /*const datas = [
        {
            id: 1,
            nom: 'ANDRIANARIDERA Tantely',
            age: 32,
            statut: 'Disponible',
            img: imgDriver,
        },
        {
            id: 1,
            nom: 'ANDRIANARIDERA Tantely',
            age: 32,
            statut: 'Vacant',
            img: imgDriver,
        },
    ]*/

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

    const renderGridDriver = (driver, index) => {
        return (
            <div className="col-12 bg-white border shadow-sm rounded" key={index}>
                <div className="relative">
                    <Tag value={driver.statut} severity={getSeverity(driver)} className="absolute top-2 right-2 text-[0.65em] font-poppins font-normal"></Tag>
                </div>

                <Avatar image={driver.img} size="xlarge" shape="circle" className="flex justify-center items-center mx-auto mt-8" />

                <div>
                    <p className="text-center font-poppins text-sm mt-4">{driver.nom}</p>
                    <p className="text-center font-poppins text-sm font-semibold">{driver.age} ans</p>
                </div>

                <div className="flex justify-between mt-6">
                    <Link to=""><Button className="bg-white border border-none outline outline-none text-sm text-gray-600 mx-2" icon="pi pi-pen-to-square" /></Link>
                    <Link to=""><Button className="bg-white border border-none outline outline-none text-sm text-gray-600 mx-2 hover:text-red-500" icon="pi pi-trash" /></Link>
                </div>
            </div>
        )
    }

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null

        let list = items.map((bus, index) => {
            return renderGridDriver(bus, index)
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
                        <h1 className="text-xl font-semibold">{t('listDriver')}</h1>

                        <div className="flex justify-start">
                            <Button label={t('addDriver')} className="font-poppins text-sm" icon="pi pi-plus" />
                        </div>
                    </div>

                    <DataView value={dataDriver} listTemplate={listTemplate} />
                </main>
            </motion.div>
        </>
    )
}

export default DriverCoop