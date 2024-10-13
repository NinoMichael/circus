import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { FloatLabel } from "primereact/floatlabel"
import { Link } from "react-router-dom"
import { Carousel } from "primereact/carousel"
import { Dialog } from 'primereact/dialog'

import NavigationMenu2 from "../../components/inc/NavigationMenu2"
import { useLanguage } from "../../context/LanguageContext"

import gare from '../../images/assets/gare.webp'
import emailVerify from '../../images/assets/emailVerif.png'

const RegisterEmailUser = () => {
    const { t } = useLanguage()

    const [loading, setLoading] = useState(false)
    const [emailvalue, emailSetValue] = useState('')
    const [emailInterface, setEmailInterface] = useState(false)

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

    const verifyEmail = (e) => {
        setLoading(true)
        setTimeout(() => {
            e.preventDefault()
            setLoading(false)
            setEmailInterface(true)
        }, 1500)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <main className="container w-[70%] bg-white rounded-md shadow-2xl flex mx-auto mt-8 text-sm max-xl:w-[85%]">
                <section className="bg-amber-400 w-[40%] max-[870px]:hidden">
                    <img src={gare} alt="Gare" width={250} height={250} className="mx-auto mt-16 w-64 h-52 rounded" />
                    <Carousel value={textIntros} numVisible={1} numScroll={1} itemTemplate={textIntroTemplate} circular autoplayInterval={5000} showNavigators={false} className="custom-carousel" />
                </section>

                <form className="py-3 px-5 max-[500px]:px-0 flex flex-col justify-center items-center mx-auto max-xl:px-0">
                    <h1 className="text-xl font-semi text-center max-[400px]:text-lg">{t('registerTitle')}</h1>
                    <p className="mt-3 max-[500px]:w-64 max-[500px]:text-center max-[400px]:text-sm">{t('enterEmail')}</p>

                    <div className="p-inputgroup flex-1 mt-10 max-[500px]:w-80 max-[400px]:w-64 max-[400px]:text-xs">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <FloatLabel>
                            <InputText type="email" value={emailvalue} onChange={(e) => emailSetValue(e.target.value)} className="font-poppins" />
                            <label htmlFor="email">{t('emailAddress')}</label>
                        </FloatLabel>
                    </div>

                    <Button label={t('submit')} loading={loading} onClick={verifyEmail} className="bg-slate-900 text-white mt-10 font-poppins border border-none outline outline-none rounded py-2 px-36 max-[500px]:px-28 max-[400px]:text-sm max-[400px]:px-24" />
                    <Dialog visible={emailInterface} modal onHide={() => { if (!emailInterface) return; setEmailInterface(false); }} className="w-[50%]">
                        <img src={emailVerify} alt="Email verification" className="w-48 h-36 flex justify-center mx-auto items-center" />
                        <div className="mt-6 px-12">
                            <h3 className="font-kanit text-center text-lg mt-4">Veuillez vérifier votre boîte e-mail</h3>
                            <p className="text-center text-sm font-poppins mt-4">Nous avons envoyé un email à votre adresse tix@gmail.com. Veuillez vérifier et continuer votre inscription à partir du lien envoyé</p>
                        </div>

                        <p className="text-center text-xs font-poppins mt-4 mb-6 cursor-pointer text-red-600 hover:text-red-700">Vous n'avez pas reçu de code ?</p>
                    </Dialog>

                    <div className="relative mt-6">
                        <Divider className="w-[24rem] max-[500px]:w-[20rem] max-[400px]:w-[16rem]" />
                        <p className="text-slate-300 font-light text-lg absolute bg-white p-4 left-40 -top-3 max-[500px]:left-32 max-[400px]:left-24">{t('or')}</p>
                    </div>

                    <div className="relative mt-4">
                        <Button label={t('googleSignup')} className="font-poppins text-sm rounded border border-none outline outline-none px-24 max-[500px]:px-16 max-[400px]:px-10 max-[400px]:text-xs" icon="pi pi-google" />
                    </div>

                    <p className="text-xs mt-10 max-[400px]:text-[0.7em]">{t('accountExist')} <Link to="/register-email" className="font-semibold">{t('login')}</Link></p>
                </form>
            </main>
        </motion.div>
    )
}

export default RegisterEmailUser