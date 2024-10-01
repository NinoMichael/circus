import React, { useState } from "react"
import { motion } from "framer-motion"
import { FloatLabel } from "primereact/floatlabel"
import { Password } from "primereact/password"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

import logo from '../../images/logo/logo-black.png'
import { useLanguage } from "../../context/LanguageContext"
import DropDownCircus from "../../components/Dropdown"
import Footer from "../../components/inc/Footer"

const LoginAdmin = () => {
    const { t } = useLanguage()

    const [userNameValue, userNameSetValue] = useState('')
    const [pwdValue, pwdSetValue] = useState('')
    const [pwd2Value, pwd2SetValue] = useState('')

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DropDownCircus />

            <main className="container w-[70%] bg-white rounded-md shadow-2xl flex mx-auto text-sm mt-6 max-xl:w-[85%]">
                <section className="bg-amber-400 w-[40%] max-[870px]:hidden">
                    <img src={logo} alt="Circus" width={250} height={250} className="mx-auto mt-24 w-52 h-44 rounded" />
                </section>

                <form className="pt-10 pb-8 px-5 flex flex-col justify-center items-center mx-auto">
                    <h1 className="text-xl font-medium text-center">{t('loginTitle')}</h1>

                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <FloatLabel>
                            <InputText value={userNameValue} onChange={(e) => userNameSetValue(e.target.value)} />
                            <label htmlFor="username">{t('username')}</label>
                        </FloatLabel>
                    </div>

                    <div className="p-inputgroup flex-1 mt-6 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <FloatLabel>
                            <Password value={pwdValue} onChange={(e) => pwdSetValue(e.target.value)} />
                            <label htmlFor="password">{t('pwd1')}</label>
                        </FloatLabel>
                    </div>

                    <div className="p-inputgroup flex-1 mt-6 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <FloatLabel>
                            <Password value={pwd2Value} onChange={(e) => pwd2SetValue(e.target.value)} />
                            <label htmlFor="confirmPassword">{t('pwd2')}</label>
                        </FloatLabel>
                    </div>

                    <Button label={t('login')} className="bg-slate-900 max-[870px]:bg-amber-400 max-[870px]:text-black text-white mt-10 font-poppins border border-none outline outline-none rounded py-2 px-36 mb-4 max-[530px]:px-24 max-[530px]:text-sm max-[410px]:px-16" />

                </form>
            </main>

            <Footer />
        </motion.div>
    )
}

export default LoginAdmin