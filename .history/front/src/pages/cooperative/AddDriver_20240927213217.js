import React, { useState } from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"

import "../../styles/user/menu.css"
import imgUser from '../../images/icons/user.png'
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"

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
                            <div className="flex justify-center items-center m-auto">
                                <Avatar image={imgUser} size="xlarge" shape="circle" className="border border-black-300 p-2 w-full h-full" />
                            </div>

                            <div className="w-96 text-sm -ms-20">
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
                                        <InputText value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
                                        <label htmlFor="contact">{t('contact')}</label>
                                    </FloatLabel>
                                </div>
                            </div>
                        </section >

                        <Button label={t('validate')} className="py-2 px-48 text-black bg-amber-400 hover:bg-amber-500 border border-none outline outline-none flex justify-center items-center mx-auto mt-16 font-poppins shadow" />
                    </form>

                </main >
            </motion.div >
        </>
    )
}

export default AddDriver