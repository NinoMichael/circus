import React from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom"

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
                <h3 className="font-semibold text-sm mt-2">{t('quickLink')}</h3>
                <Link to="/trip" className="text-xs"><p className="mt-3">{t('trip')}</p></Link>
                <Link to="/trip" className="text-xs"><p className="mt-2">{t('tarif')}</p></Link>
            </section>

            <section>
                <h3 className="font-semibold text-sm mt-2">{t('quickLink')}</h3>
                <Link to="/trip" className="text-xs"><p className="mt-3">{t('trip')}</p></Link>
                <Link to="/trip" className="text-xs"><p className="mt-2">{t('tarif')}</p></Link>
            </section>

            <section>
                <h3 className="font-semibold text-sm mt-2">{t('infoPerso')}</h3>
                <Link to="mailto:support-circus@gmail.com" className="text-xs"><p className="mt-3"><i className="pi pi-envelope me-2"></i>support-circus@gmail.com</p></Link>
                <p className="mt-2 text-xs"><i className="pi pi-map-marker me-2"></i>Antananarivo 101, Madagascar</p>
            </section>

            <p className="text-[0.6em]">{t('copyright')}</p>
        </footer>
    )
}

export default FooterMain
