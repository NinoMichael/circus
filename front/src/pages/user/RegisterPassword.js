import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { FloatLabel } from "primereact/floatlabel"
import { Checkbox } from "primereact/checkbox"
import { Password } from "primereact/password"
import { Link } from "react-router-dom"
import { Carousel } from "primereact/carousel"
import { Dialog } from 'primereact/dialog'

import gare from '../../images/assets/gare.webp'

import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import { useLanguage } from "../../context/LanguageContext"
import logo from "../../images/logo/logo-black.png"

const RegisterPassword = () => {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const [userNameValue, userNameSetValue] = useState('')
    const [pwdValue, pwdSetValue] = useState('')
    const [confirmPwdValue, confirmPwdSetValue] = useState('')
    const [checked, setChecked] = useState(false)

    const textIntros = [
        { id: 1, text: t('textIntro1') },
        { id: 2, text: t('textIntro2') },
        { id: 3, text: t('textIntro3') },
    ]

    const textIntroTemplate = (textIntro) => (
        <div className="mx-auto flex flex-col justify-center mt-8">
            <p key={textIntro.id} className="font-poppins mx-12 text-sm text-center"> {textIntro.text} </p>
        </div>
    )

    const headerElement = (
        <div>
            <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
    )


    const registerAccount = (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setVisible(true)
        }, 5000)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <main className="container w-[70%] bg-white rounded-md shadow-2xl flex mx-auto text-sm mt-6 max-xl:w-[85%]">
                <section className="bg-amber-400 w-[40%] max-[870px]:hidden">
                    <img src={gare} alt="Gare" width={250} height={250} className="mx-auto mt-12 w-64 h-52 rounded" />
                    <Carousel value={textIntros} numVisible={1} numScroll={1} itemTemplate={textIntroTemplate} circular autoplayInterval={5000} showNavigators={false} className="custom-carousel" />
                </section>

                <form className="py-3 px-5 flex flex-col justify-center items-center mx-auto">
                    <h1 className="text-xl font-medium text-center">{t('registerTitle')}</h1>
                    <p className="mt-3 max-[410px]:text-sm max-[410px]:text-center">{t('infoComp')}</p>

                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <FloatLabel>
                            <InputText value={userNameValue} onChange={(e) => userNameSetValue(e.target.value)} className="font-poppins text-sm" />
                            <label htmlFor="username">{t('username')}</label>
                        </FloatLabel>
                    </div>

                    <div className="p-inputgroup flex-1 mt-6 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <FloatLabel>
                            <Password value={pwdValue} onChange={(e) => pwdSetValue(e.target.value)} className="font-poppins text-sm" />
                            <label htmlFor="password">{t('password')}</label>
                        </FloatLabel>
                    </div>

                    <div className="p-inputgroup flex-1 mt-6 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <FloatLabel>
                            <Password value={confirmPwdValue} onChange={(e) => confirmPwdSetValue(e.target.value)} className="font-poppins text-sm" />
                            <label htmlFor="confirmPassword">{t('pwdConfirm')}</label>
                        </FloatLabel>
                    </div>

                    <div className="-ms-12 mt-6 max-[530px]:mx-8">
                        <Checkbox inputId="accept" onChange={e => setChecked(e.checked)} checked={checked} />
                        <label htmlFor="accept" className="ml-2 text-[0.7em]">{t('accept')} <Link to="/use-conditions" className="underline">{t('termsServices')}</Link> {t('and')} <Link to="/use-conditions" className="underline">{t('conditionUse')}</Link> </label>
                    </div>

                    <Button icon="pi pi-check" label={t('submit')} className="bg-slate-900 text-white mt-10 font-poppins border border-none outline outline-none rounded py-2 px-36 mb-4 max-[530px]:px-24 max-[530px]:text-sm max-[410px]:px-16" onClick={registerAccount} loading={loading} />

                    <Dialog visible={visible} modal header={headerElement} className="w-96 h-80 p-4" onHide={() => { if (!visible) return; setVisible(false) }}>
                        <h3 className="font-kanit text-center mt-4 text-lg">Inscription réussie</h3>
                        <Button label="Retourner à la page de connexion" className="bg-amber-400 font-poppins text-sm px-4 py-2 border border-none outline outline-none shadow mt-6 flex justify-center items-center mx-auto" />
                    </Dialog>
                </form>
            </main>
        </motion.div>
    )
}

export default RegisterPassword