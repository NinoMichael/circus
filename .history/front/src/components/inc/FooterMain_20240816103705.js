import React from "react"
import { useLanguage } from "../../context/LanguageContext"

import logo from '../../images/logo/logo.png'

const FooterMain = () => {
    const { t } = useLanguage()

    return (
        <footer className="mt-16 bg-slate-900 text-white grid grid-cols-4 py-4 px-20">
            <section>
                <img src={logo} alt="Logo Circus" width={100} height={100} className="w-20 h-20" />
                <p className="text-xs w-52">{t('platform')}</p>
            </section>

            <section>
                <h3 className="">{t('quickLink')}</h3>
            </section>
        </footer>
    )
}

export default FooterMain
