import React from "react"
import { useLanguage } from "../../context/LanguageContext"

import logo from '../../images/logo/logo.png'

const FooterMain = () => {
    const {t} = useLanguage()

    return (
        <footer className="mt-16 bg-slate-900 text-white grid grid-cols-4">
            <section>
                <img src = {logo} alt = "Logo Circus" width={100} height={100} className="w-24 h-24"/>  
            </section>    
        </footer>
    )
}

export default FooterMain
