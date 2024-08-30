import React from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"

import logo from '../../images/logo/logo.png'

const FooterMain = () => {
    const { t } = useLanguage()

    return (
        <>
            <footer className="mt-16 bg-slate-900 text-white py-4 px-20">


                <p className="text-[0.6em] mt-6 text-end -me-14">{t('copyright')}</p>
            </footer>
        </>

    )
}

export default FooterMain
