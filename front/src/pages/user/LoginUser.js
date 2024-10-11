import React, { useState } from "react"
import { motion } from "framer-motion"
import { InputText } from "primereact/inputtext"
import { FloatLabel } from "primereact/floatlabel"
import { Password } from "primereact/password"
import { Checkbox } from "primereact/checkbox"
import { Link } from "react-router-dom"
import { Divider } from "primereact/divider"
import { Carousel } from "primereact/carousel"
import { auth, provider, signInWithPopup } from "../../utils/firebaseConfig"

import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "primereact/button"

import gare from '../../images/assets/gare.webp'

const LoginUser = () => {
    const { t } = useLanguage()
    const [emailvalue, emailSetValue] = useState('')
    const [pwdValue, pwdSetValue] = useState('')
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGoogleSignIn = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth, provider)
            console.log("MISOKATRA")
            const user = result.user
            console.log("Utilisateur connecté :", user)
        } catch (error) {
            console.error("Erreur lors de la connexion :", error)
        }
    }

    const textIntros = [
        { id: 1, text: t('textIntro1') },
        { id: 2, text: t('textIntro2') },
        { id: 3, text: t('textIntro3') },
    ]

    const textIntroTemplate = (textIntro) => (
        <div className="mx-auto flex flex-col justify-center mt-12">
            <p key={textIntro.id} className="font-poppins mx-12 text-sm text-center"> {textIntro.text} </p>
        </div>
    )

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <main className="container w-[70%] bg-white rounded-md shadow-2xl flex mx-auto text-sm max-lg:w-[85%]">
                <section className="bg-amber-400 w-[40%] max-[870px]:hidden">
                    <img src={gare} alt="Gare" width={250} height={250} className="mx-auto mt-16 w-64 h-52 rounded" />
                    <Carousel value={textIntros} numVisible={1} numScroll={1} itemTemplate={textIntroTemplate} circular autoplayInterval={5000} showNavigators={false} className="custom-carousel" />
                </section>

                <form className="py-3 px-5 flex flex-col justify-center items-center mx-auto max-sm:px-10 max-[530px]:px-auto max-xs:-ms-12 max-[400px]:-ms-16 max-[380px]:-ms-[4rem] max-[360px]:-ms-[5rem]">
                    <h1 className="text-xl font-semi text-center max-xs:text-lg">{t('loginTitle')}</h1>
                    <p className="mt-3 max-xs:text-xs max-[360px]:w-64 max-[360px]:text-center">{t('introLogin')}</p>

                    <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-xs:w-72 max-[380px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <FloatLabel>
                            <InputText type="email" value={emailvalue} onChange={(e) => emailSetValue(e.target.value)} className="font-poppins text-sm" />
                            <label htmlFor="email" className="custom-label">{t('emailAddress')}</label>
                        </FloatLabel>
                    </div>

                    <div className="p-inputgroup flex-1 mt-6 max-[530px]:w-80 max-[530px]:text-xs max-xs:w-72 max-[380px]:w-64">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <FloatLabel>
                            <Password value={pwdValue} onChange={(e) => pwdSetValue(e.target.value)} className="font-poppins text-sm" />
                            <label htmlFor="password">{t('password')}</label>
                        </FloatLabel>
                    </div>

                    <div className="flex justify-between space-x-28 mt-4 text-xs max-[530px]:text-[0.7em] max-xs:space-x-20 max-[380px]:space-x-8">
                        <div>
                            <Checkbox inputId="rememberMe" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="rememberMe" className="ml-2">{t('rememberMe')}</label>
                        </div>

                        <Link to="/forgotten-password" className="mt-1">{t('pwdForgot')}</Link>
                    </div>

                    <Button label={t('login')} type="submit" loading={loading} className="bg-slate-900 text-white mt-10 font-poppins border border-none outline outline-none rounded py-2 px-36 max-sm:px-32 max-[530px]:text-sm max-[530px]:px-24 max-[380px]:px-16" />

                    <div className="relative mt-6">
                        <Divider className="w-[24rem]" />
                        <p className="text-slate-300 font-light text-lg absolute bg-white p-4 left-40 -top-3">{t('or')}</p>
                    </div>

                    <div className="relative mt-4">
                        <Button label={t('googleLogin')} className="font-poppins text-sm rounded border border-none outline outline-none px-24 max-sm:px-20 max-[530px]:text-xs max-[530px]:px-16 max-[530px]:py-3 max-[380px]:px-6"
                            icon="pi pi-google" onClick={handleGoogleSignIn} />
                    </div>

                    <p className="text-xs mt-10 max-xs:text-[0.7em]">{t('accountYet')} <Link to="/register-email" className="font-semibold">{t('register')}</Link></p>
                </form>
            </main>
        </motion.div>
    )
}

export default LoginUser