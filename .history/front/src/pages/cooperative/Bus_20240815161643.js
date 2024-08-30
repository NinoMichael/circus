import React, {useState} from "react"
import DashHeader from "../../components/inc/DashHeader"
import Dashmenu from "../../components/inc/Dashmenu"
import { motion } from "framer-motion"
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Tag } from "primereact/tag"
import { Link } from "react-router-dom"
import { Card } from "primereact/card"

import imgBus1 from '../../images/assets/sprinter.png'

const BusCoop = () => {
    const {t} = useLanguage()

    const datas = [
        {
            id : 1,
            matricule : 'TAF 1234',
            chauffeur : 'Mr Tantely',
            statut : 'Disponible',
            img : imgBus1,  
        },
        {
            id : 1,
            matricule : 'TAF 1234',
            chauffeur : 'Mr Tantely',
            statut : 'Vacant',
            img : imgBus1,
            
        },
        {
            id : 1,
            matricule : 'TAF 1234',
            chauffeur : 'Mr Tantely',
            statut : 'Vacant',
            img : imgBus1,
            
        },
        {
            id : 1,
            matricule : 'TAF 1234',
            chauffeur : 'Mr Tantely',
            statut : 'Vacant',
            img : imgBus1,   
        }
    ] 

    const getSeverity = (data) => {
        switch (data.status) {
            case 'Disponible':
                return 'success';

            case 'Vacant':
                return 'warning';

            case 'En entretien':
                return 'danger';

            default:
                return null;
        }
    };

    const renderGridBus = (bus, index) => {
        return (
            <div className="col-12 bg-white border shadow-sm rounded" key={index}>
                <div className = "relative">
                    <img src = {bus.img} alt = "Bus" width = {150} height = {150} className="w-full h-36 rounded-t"/>
                    <Tag value={bus.status} severity={getSeverity(bus)} className="absolute top-2 right-2"></Tag>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((bus, index) => {
            return renderGridBus(bus, index);
        });

        return <div className="grid grid-cols-4 gap-x-4 ms-8 me-6">{list}</div>;
    };
    
    return (
        <> 
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t('listBus')}</h1>

                        <div className="flex justify-start">
                            <Button label={t('addBus')} className="font-poppins text-sm" icon = "pi pi-plus"/>
                        </div>
                    </div>
                        
                    <DataView value={datas} listTemplate={listTemplate} />
                </main>
               
            </motion.div>
        </>
    )
}

export default BusCoop