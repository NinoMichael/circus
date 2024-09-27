import React, { useState } from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"

import "../../styles/user/menu.css"
import { Avatar } from "primereact/avatar"

const AddDriver = () => {
    const [nomValue, nomSetValue] = useState()
    const [ageValue, setAgeValue] = useState()
    const [phoneValue, setPhoneValue] = useState()

    const { t } = useLanguage()

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

                    <form>
                        <section className="grid grid-cols-2 mt-8">
                            <div>
                                <Avatar image={imgUser}>
                                </Avatar>

                                <div className="w-96 text-sm">
                                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <FloatLabel>
                                            <InputText value={nomValue} onChange={(e) => nomSetValue(e.target.value)} />
                                            <label htmlFor="nom">{t('nameBook')}</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <FloatLabel>
                                            <InputText value={ageValue} onChange={(e) => setAgeValue(e.target.value)} />
                                            <label htmlFor="age">{t('age')}</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-phone"></i>
                                        </span>
                                        <FloatLabel>
                                            <InputText value={ageValue} onChange={(e) => setAgeValue(e.target.value)} />
                                            <label htmlFor="contact">{t('contact')}</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                        </section >
                    </form>

                </main >
            </motion.div >
        </>
    )
}

export default AddDriver