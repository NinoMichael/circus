import React, { useState } from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"

import "../../styles/user/menu.css"

const AddBus = () => {
    const [nomValue, nomSetValue] = useState()

    const { t } = useLanguage()

    const optionTypeTemplate = (option) => {
        return (
            <div className="flex items-center">
                <p>{option.nom}</p>
            </div>
        );
    };

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t('addDriver')}</h1>
                        <Link title="Aide"><i className="pi pi-info-circle text-xl"></i></Link>
                    </div>

                    <section className="grid grid-cols-2 mt-8">
                        <div>
                            <div className="border border-dashed border-black py-20 px-12 w-64 m-auto flex justify-center items-center">
                                <p className="border border-dashed text-sm flex justify-center items-center m-auto"><i className="pi pi-plus me-2"></i>{t('addImage')}</p>
                            </div>
                        </div>

                        <div className="w-96 text-sm">
                            <form>
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={nomValue} onChange={(e) => nomSetValue(e.target.value)} />
                                        <label htmlFor="nom">{t('matricule')}</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-car"></i>
                                    </span>
                                    <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="type"
                                        placeholder="Type de transport" filter itemTemplate={optionTypeTemplate} className="custom-p-dropdown font-poppins" panelClassName="text-sm font-poppins" />
                                </div>
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-users"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={capacityValue} onChange={(e) => capacitySetValue(e.target.value)} />
                                        <label htmlFor="capacite">{t('capacite')}</label>
                                    </FloatLabel>
                                </div>
                            </form>
                        </div>
                    </section >
                </main >
            </motion.div >
        </>
    )
}

export default AddBus