import React, { useState } from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { FileUpload } from "primereact/fileupload"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"

import "../../styles/user/menu.css"

const AddBus = () => {
    const [nomValue, nomSetValue] = useState()
    const [capacityValue, capacitySetValue] = useState()
    const [selectedType, setSelectedType] = useState(null)
    const [selectedDriver, setSelectedDriver] = useState(null)
    const types = [
        { id: '1', nom: 'Mazda' },
        { id: '2', nom: 'Sprinter' },
        { id: '3', nom: 'Crafter' },
        { id: '4', nom: 'Karabe' },
    ]
    const drivers = [
        { id: '1', nom: 'Rakoto' },
        { id: '2', nom: 'Rabe' },
        { id: '3', nom: 'Rabary' },
    ]
    const [imgTransport, setImgTransport] = useState(null)

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const onUpload = (e) => {
        const file = e.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            setImgTransport(e.target.result)
        }

        reader.readAsDataURL(file)
    }

    const { t } = useLanguage()

    const optionTypeTemplate = (option) => {
        return (
            <div className="flex items-center">
                <p>{option.nom}</p>
            </div>
        )
    }

    const optionAssignmentTemplate = (option) => {
        return (
            <div className="flex justify-center items-center">
                <Avatar label="V" className="me-2" shape="circle" />
                <p>{option.nom}</p>
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
                        <h1 className="text-xl font-semibold">{t('addBus')}</h1>
                        <Link title="Aide"><i className="pi pi-info-circle text-xl"></i></Link>
                    </div>

                    <form className="bg-white shadow-lg rounded mx-24 pb-12 mt-2">
                        <section className="grid grid-cols-2">
                            <div>
                                <FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} customUpload auto uploadHandler={onUpload} className="invisible" />
                                {imgTransport ? <div className="border border-black-300 w-64 mt-12 py-2 flex mx-auto justify-center items-center">
                                    {<img src={imgTransport} alt="Transport" className="h-full" />}
                                </div>
                                    :
                                    <div className="border border-dashed border-black py-20 px-12 w-64 mt-12 mx-auto flex justify-center items-center">
                                        {<p className=" border border-dashed text-sm flex justify-center items-center m-auto cursor-pointer" onClick={() => document.querySelector('.p-fileupload-choose input').click()}><i className="pi pi-plus me-2"></i>{t('addImage')}</p>}
                                    </div>}
                            </div>

                            <div className="w-96 text-sm">
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={nomValue} onChange={(e) => nomSetValue(e.target.value)} />
                                        <label htmlFor="Matricule">{t('matricule')}</label>
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
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <Dropdown value={selectedDriver} onChange={(e) => setSelectedDriver(e.value)} options={drivers} optionLabel="type"
                                        placeholder={t('assignDriver')} filter itemTemplate={optionAssignmentTemplate} className="custom-p-dropdown font-poppins" panelClassName="text-sm font-poppins" />
                                </div>
                            </div>
                        </section >

                        <Button label={t('validate')} className="py-2 px-48 text-black bg-amber-400 hover:bg-amber-500 border border-none outline outline-none flex justify-center items-center mx-auto mt-16 font-poppins shadow"
                            icon="pi pi-check" loading={loading} onClick={load} />
                    </form>
                </main >
            </motion.div >
        </>
    )
}

export default AddBus