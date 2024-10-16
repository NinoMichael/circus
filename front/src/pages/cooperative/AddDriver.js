import React, { useState } from "react"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { FileUpload } from "primereact/fileupload"
import { createChauffeur } from "../../API/driverService"
import "../../styles/user/menu.css"
import imgUser from '../../images/icons/user.png'
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"

const AddDriver = () => {
    const [nomValue, setNomValue] = useState("")
    const [ageValue, setAgeValue] = useState("")
    const [phoneValue, setPhoneValue] = useState("")
    const [imgDriver, setImgDriver] = useState(null)
    const [imgFile, setImgFile] = useState(null)

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const { t } = useLanguage()

    const load = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const onUpload = (e) => {
        const file = e.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgDriver(event.target.result);
            };
            reader.readAsDataURL(file);
            setImgFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        setSuccessMessage("")

        if (!nomValue || !ageValue || !phoneValue) {
            setErrorMessage(t('pleaseFillAllFields'))
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('nom_chauffeur', nomValue)
        formData.append('age', ageValue)
        formData.append('contact', phoneValue)

        if (imgFile) {
            formData.append('img', imgFile);
        }



        try {
            const response = await createChauffeur(formData)
            setSuccessMessage(t('Chauffeur ajouter'))
            setLoading(false)
        } catch (error) {
            setErrorMessage(t("Erreur de l'ajout du chauffeur"))
            setLoading(false)
        }
    }

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

                    <form className="bg-white shadow-lg rounded mx-24 pb-12 mt-6" onSubmit={handleSubmit}>
                        <section className="grid grid-cols-2 mt-8">
                            <div className="flex justify-center items-center m-auto relative">
                                <Avatar image={imgDriver || imgUser} size="xlarge" shape="circle" className="border border-black-300 p-2 w-full h-full" />
                                <FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} customUpload auto uploadHandler={onUpload} className="invisible" />
                                <i className="pi pi-plus-circle text-slate-900 font-extrabold text-3xl absolute bottom-0 right-28 cursor-pointer" onClick={() => document.querySelector('.p-fileupload-choose input').click()}></i>
                            </div>

                            <div className="w-96 text-sm -ms-20">
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={nomValue} onChange={(e) => setNomValue(e.target.value)} />
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
                        {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
                        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
                        <Button label={t('validate')} className="py-2 px-48 text-black bg-amber-400 hover:bg-amber-500 border border-none outline outline-none flex justify-center items-center mx-auto mt-16 font-poppins shadow"
                            icon="pi pi-check" loading={loading} />
                    </form>

                </main >
            </motion.div >
        </>
    )
}

export default AddDriver